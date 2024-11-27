const { test, expect } = require('@playwright/test');
const {exec} = require("child_process");
const path = require('path');
const { platform } = require('os');

let frontendProcess;

test.describe('Admin Registration, Login, and Logout Flow', () => {
    let newAdminEmail;
    let newAdminPassword;

    test.beforeAll(async () => {

        const frontendAbsolutePath = path.resolve(__dirname, '../../../../../../../login-system-frontend/');
        const env = { ...process.env, BROWSER: 'none' };
        // Start the frontend server
        frontendProcess = exec('npm start', { cwd: frontendAbsolutePath, env }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error starting frontend: ${error.message}`);
            }
            if (stderr) {
                console.error(`Frontend stderr: ${stderr}`);
            }
        });

        // Wait for the frontend to be ready if necessary
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 sec

        // Generate a unique email for testing
        const timestamp = Date.now();
        newAdminEmail = `adminuser${timestamp}@example.com`;
        newAdminPassword = 'AdminPassword123';
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

    test('should register a new admin, login, and then logout', async ({ page }) => {
        // Mock the POST request for admin registration
        await page.route('**/api/employee/add', (route, request) => {
            const requestBody = JSON.parse(request.postData());
            if (requestBody.email === newAdminEmail) {
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

        // Mock the GET request to check if admin exists in the database
        await page.route('**/api/employee/get*', (route, request) => {
            const url = new URL(request.url());
            const emailParam = url.searchParams.get('email');

            if (emailParam === newAdminEmail) {
                route.fulfill({
                    status: 200,
                    body: JSON.stringify({ email: newAdminEmail, firstname: 'Admin', lastname: 'User' })
                });
            } else {
                route.fulfill({
                    status: 404,
                    body: JSON.stringify({ message: 'User not found' })
                });
            }
        });

        // Open the registration page
        await page.goto('http://localhost:3000/register');

        // Fill in the registration form
        await page.fill('input[placeholder="First Name"]', 'Admin');
        await page.fill('input[placeholder="Last Name"]', 'User');
        await page.fill('input[placeholder="Email"]', newAdminEmail);
        await page.fill('input[placeholder="Password"]', newAdminPassword);
        await page.fill('input[placeholder="Date of Birth"]', '2024-11-22');
        await page.click('input[value="Admin"]');  // Select 'admin' role

        // Submit the registration form
        await page.click('button:has-text("Register")');

        // Confirm registration success message
        await expect(page.locator('h1')).toHaveText('Registration successful');

        // Click on the "login here" link
        const loginLink = page.locator('a:has-text("Login here")');
        await loginLink.click();

        // Confirm that the user is redirected to the login page
        await expect(page).toHaveURL('http://localhost:3000');

        // Log in as the newly registered admin
        await page.fill('input[placeholder="Email"]', newAdminEmail);
        await page.fill('input[placeholder="Password"]', newAdminPassword);
        await page.click('button:has-text("Login")');

        // Confirm that the admin is redirected
        await expect(page).toHaveURL('http://localhost:3000')
        await expect(page.locator('h1')).toHaveText('Dashboard');
        const welcomeText = page.locator('.navbar span');
        await expect(welcomeText).toHaveText('Welcome, Admin!');

        // Log out
        const userIcon = page.locator('svg.user-icon');
        await userIcon.click(); // Open the user menu

        const logoutOption = page.locator('li:has-text("Logout")');
        await logoutOption.waitFor({ state: 'visible', timeout: 5000 });
        await logoutOption.click(); // Log out the admin

        const loginButton = page.locator('button:has-text("Login")');
        await expect(loginButton).toBeVisible();
    });
});



