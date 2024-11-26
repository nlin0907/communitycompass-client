const { test, expect } = require('@playwright/test');
const { exec } = require('child_process');
const path = require('path');
const { platform } = require('os');

let frontendProcess;

test.describe('General User Registration, Login, and Logout Flow', () => {
  let newUserEmail;
  let newUserPassword;

  test.beforeAll(async () => {
    // Define the absolute path to the frontend directory
    const frontendAbsolutePath = path.resolve(__dirname, '../../../../../../../login-system-frontend/');
    const env = { ...process.env, BROWSER: 'none' };

    // Start the frontend server with the environment variable set
    frontendProcess = exec('npm start', { cwd: frontendAbsolutePath, env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting frontend: ${error.message}`);
      }
      if (stderr) {
        console.error(`Frontend stderr: ${stderr}`);
      }
    });

    // Wait for the frontend to be ready (adjust timeout if necessary)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const timestamp = Date.now();
    newUserEmail = `testuser${timestamp}@example.com`;
    newUserPassword = 'TestPassword123';
  });

  test.afterAll(async () => {
    // Kill the frontend process
    if (frontendProcess) {
      console.log(`Killing frontend process with PID: ${frontendProcess.pid}`);
      frontendProcess.kill('SIGTERM');
      console.log('Frontend process terminated');
    } else {
      console.log('Frontend process was not running or already stopped');
    }

    if (platform() === 'win32') {
      exec('taskkill /F /PID $(netstat -ano | findstr ":3000" | findstr "LISTEN" | awk \'{print $5}\')', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error terminating process on port 3000: ${error.message}`);
        }
        if (stderr) {
          console.error(`Error output: ${stderr}`);
        }
      });
    } else {
      exec('lsof -t -i:3000 | xargs kill -9', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error terminating process on port 3000: ${error.message}`);
        }
        if (stderr) {
          console.error(`Error output: ${stderr}`);
        }
      });
    }
  });
      

  test('should register a new user, login, and then logout', async ({ page }) => {
    // Mock the POST request for user registration
    await page.route('**/api/employee/add', (route, request) => {
      const requestBody = JSON.parse(request.postData());
      if (requestBody.email === newUserEmail) {
        // Simulate successful registration
        route.fulfill({
          status: 201,
          body: JSON.stringify('Employee registered successfully'),
        });
      } else {
        // Simulate failure if needed (e.g., email already exists)
        route.fulfill({
          status: 400,
          body: JSON.stringify('Email already exists'),
        });
      }
    });

    // Mock the GET request to check if user exists in the database
    await page.route('**/api/employee/get*', (route, request) => {
      const url = new URL(request.url());
      const emailParam = url.searchParams.get('email');
      
      if (emailParam === newUserEmail) {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ email: newUserEmail, firstname: 'John', lastname: 'Doe' })
        });
      } else {
        route.fulfill({
          status: 404,
          body: JSON.stringify({ message: 'User not found' })
        });
      }
    });

    // Step 1: Open the registration page
    await page.goto('http://localhost:3000/register');

    // Step 2: Fill in the registration form
    await page.fill('input[placeholder="First Name"]', 'John');
    await page.fill('input[placeholder="Last Name"]', 'Doe');
    await page.fill('input[placeholder="Email"]', newUserEmail);
    await page.fill('input[placeholder="Password"]', newUserPassword);
    await page.fill('input[placeholder="Date of Birth"]', '2024-11-22');
    await page.click('input[value="general"]');  // Select 'general' role

    // Step 3: Submit the registration form
    await page.click('button:has-text("Register")');

    // Step 4: Confirm registration success message
    await expect(page.locator('h1')).toHaveText('Registration successful');

    // Step 5: Click on the "login here" link
    const loginLink = page.locator('a:has-text("Login here")');
    await loginLink.click();

    // Step 6: Confirm that the user is redirected to the login page
    await expect(page).toHaveURL('http://localhost:3000');  // Adjust URL to match your login page

    // Step 7: Fill in the login form with the same credentials
    await page.fill('input[placeholder="Email"]', newUserEmail);
    await page.fill('input[placeholder="Password"]', newUserPassword);

    // Step 8: Submit the login form (adjust the button text if necessary)
    await page.click('button:has-text("Login")');

    // Step 9: Confirm that the user is redirected to the general dashboard
    await expect(page).toHaveURL('http://localhost:3000');
    await expect(page.locator('h1')).toHaveText('Dashboard');
    
    const createUserText = page.locator('h2');
    await expect(createUserText).toHaveText('Create a New User');

    // Step 10: Confirm the username is displayed correctly at the top left of the dashboard
    const welcomeText = page.locator('.navbar-left .welcome-text');
    await expect(welcomeText).toHaveText('Welcome, John!');
    
    // Step 11: Log out
    const userIcon = page.locator('svg.user-icon'); // Use the correct selector for FaUser icon
    await userIcon.click(); // Open the user menu

    const logoutOption = page.locator('li:has-text("Logout")');
    await logoutOption.waitFor({ state: 'visible', timeout: 5000 });
    await logoutOption.click(); // Log out the user

    const loginButton = page.locator('button:has-text("Login")');
    await expect(loginButton).toBeVisible();

  });
});
