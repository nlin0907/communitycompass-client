# Manual End-to-End Testing Documentation for Admin and General Users

## General Notes
- **Expected outcomes** include:
   - Alerts for input validation issues.
   - Console logs for success or error scenarios.
   - Network requests to the appropriate endpoints for valid inputs.
     - You can click on these requests for more info on the Payload, Preview, and Response to verify success.
   - Any other UI message or output.
- Use **Inspect Element/Developer Tools** (Command + Option + J for Mac) to verify network requests and console logs.

---

## Admin Functionalities

### **1. Register and Login as new Admin**
1. Click on "Click here to register"
2. Enter credentials
   - Example:
   ```
   First Name: Amy
   Last Name: Pu
   Email: amy@gmail.com
   Password: 12345
   DOB: mm/dd/yyyy
   ```
3. Select Admin at the bottom of the form
4. Click REGISTER then click Login here
5. Enter the email and password credentials you just chose
6. Select Admin
7. Click LOGIN
8. Verify successful login and redirection to the Admin Dashboard.

### **1. Add Community Group**
1. **Click "Add Community Group" Button**:
   - Verify that the "Add Community Group" form appears.
2. **Open browser console**
   - Command + Option + J for Mac
2. **Fill in the Form**:
   - Provide valid inputs for all fields.
      - Example:
        ```
        Community Name: Calm Community
        Community Type: MENTAL_HEALTH
        Latitude: 37.7749
        Longitude: -122.4194
        Capacity: 100
        Description: This is a test community. 
        ```
3. **Submit the Form**:
   - Click the "Add Community Group" button.
   - **Expected Behavior**:
      - No alerts appear (valid inputs).
      - Console log: `Community group added: <response object>`.
        - **NOTE: Make a note of the returned communityId for next testing steps.**
      - Network tab shows a POST request to `/createCommunityGroup`.
4. **Invalid Input**:
   - Example invalid inputs to try:
      - Blank `Community Name`.
      - Invalid community type "MEDITATION"
      - Negative `Capacity`.
      - Latitude or longitude out of range.
   - **Expected Behavior**:
      - Alerts:
         - `Community name cannot be empty.`
         - `Invalid community type. Allowed types: MENTAL_HEALTH, EMPLOYMENT_ASSISTANCE, OTHER.`
         - `Capacity cannot be negative.`
         - `Latitude must be between -90 and 90.`
         - `Longitude must be between -180 and 180.`
      - No network requests are made for invalid inputs.

---

### **2. Add Resource**
1. **Click "Add Resource" Button**:
   - Verify that the "Add Resource" form appears.
2. **Fill in the Form**:
   - Provide valid inputs for all fields.
      - Example:
        ```
        Resource Name: Public Hostel
        Resource Type: SHELTER
        Latitude: 37.7749
        Longitude: -122.4194
        Resource Hours: 9AM-5PM
        Description: A test resource.
        ```
3. **Submit the Form**:
   - Click the "Add Resource" button.
   - **Expected Behavior**:
      - Alert saying "Resource added successfully!"
      - Console log: `Resource added: <response object>`.
      - **NOTE: Make a note of the returned resourceId for next testing steps.**
      - Network tab shows a POST request to `/createResource`.
4. **Invalid Input**:
   - Example invalid inputs:
      - Blank `Resource Name`.
      - Invalid `Resource Hours` format.
   - **Expected Behavior**:
      - Alerts:
         - `Resource name cannot be empty.`
         - `Resource hours must be in the format HHAM-HHPM.`
         - `Latitude must be between -90 and 90.`
         - `Longitude must be between -180 and 180.`
      - No network requests are made for invalid inputs.

---

### **3. Delete Community Group**
1. **Click "Delete Community Group" Button**:
   - Verify that the "Delete Community Group" form appears.
2. **Fill in the Form**:
   - Enter a valid `Community ID`. You can use the communityId from above.

3. **Submit the Form**:
   - Click the "Delete" button.
   - **Expected Behavior**:
      - Console log: `Community Group deleted: Community Group Deleted Successfully`.
      - Console log: You may see a "Response is not valid JSON" warning, but this can be disregarded.
      - Network tab shows a DELETE request to `/deleteCommunityGroup`.
      - User-facing success message: None (console-only logging for now).
4. **Invalid Input**:
   - Example invalid inputs:
      - Non-existent or blank `Community ID`.
   - **Expected Behavior**:
      - Console error: `Error deleting community group: <error message>`.

---

### **4. Delete Resource**
1. **Click "Delete Resource" Button**:
   - Verify that the "Delete Resource" form appears.
2. **Fill in the Form**:
   - Enter a valid `Resource ID`. You can use the communityId from above.

3. **Submit the Form**:
   - Click the "Delete" button.
   - **Expected Behavior**:
      - Console log: `Resource deleted: Resource Deleted Successfully`.
      - Console log: You may see a "Response is not valid JSON" warning, but this can be disregarded.
      - Network tab shows a DELETE request to `/deleteResource`.
      - User-facing success message: None (console-only logging for now).
4. **Invalid Input**:
   - Example invalid inputs:
      - Non-existent or blank `Resource ID`.
   - **Expected Behavior**:
      - Console error: `Error deleting resource: <error message>`.

### **4. Logout**
1. Click the person icon at the top right of the page
2. Confirm navigation back to the Login page
---

## General User Functionalities

### **1. Register and Login as a new General User**
1. Click on "Click here to register"
2. Enter credentials
    - Example:
   ```
   First Name: Griffin
   Last Name: Newbold
   Email: griffin@gmail.com
   Password: 12345
   DOB: mm/dd/yyyy
   ```
3. Select General at the bottom of the form
4. Click REGISTER, then click Login here
5. Enter the email and password credentials you just chose
6. Select General
7. Click LOGIN
8. Verify successful login and redirection to the General Dashboard.

### **2. Create User**
1. **Navigate to "Create User" Tab**:
   - Verify that the "Create User" form appears.
2. **Fill in the Form**:
   - Provide valid inputs for all fields.
      - Example:
        ```
        Name: Mickey Mouse
        Email: mickey@example.com
        Age: 25
        Sex: MALE
        Latitude: 100.1010
        Longitude: 25.4235
        ```
3. **Submit the Form**:
   - Click the "Create User" button.
   - **Expected Behavior**:
      - Alert will appear: User created successfully!
      - Console log: `User created: <response object>`.
      - **NOTE this userId in the response object for next testing steps**
      - Network tab shows a POST request to `/createUser`.
4. **Invalid Input**:
   - Example invalid inputs:
      - Blank `Name`.
      - Invalid `Email`.
      - Negative `Age`.
      - Latitude or longitude out of range. 
   - **Expected Behavior**:
      - Alerts:
         - `Name cannot be empty.`
         - `Invalid email address.`
         - `Age cannot be negative.`
         - `Latitude/longitude must be between -90 and 90.`
      - No network requests are made for invalid inputs.

---

### **3. Manage Community Group Membership**
1. **Navigate to "Manage Community Group Membership" Tab**:
   - Verify that the membership management form appears.
2. **Add to Community Group**:
   - Enter a valid `User ID` and `Community Group ID`. Use the ones you have been noting down so far.
   - Click "Add to Community Group".
   - **Expected Behavior**:
      - Console log: `User added to community group: User added to community group successfully`.
      - Network tab shows a POST request to `/addUserToCommunity`.
   - Invalid inputs (e.g., non-existent IDs, empty):
      - Console log: Community Group Not Found error, or HTTP Error 400, respectively
3. **Remove from Community Group**:
   - Enter a valid `User ID` and `Community Group ID`.
   - Click "Remove from Community Group".
   - **Expected Behavior**:
      - Console log: `User removed from community group: User removed from community group successfully`.
      - Network tab shows a DELETE request to `/removeUserFromCommunity`.
   - Invalid inputs (empty, nonexistent IDs):
      - Console log (depending on the type of invalid input): 
        - Error removing user from community group: Error: HTTP error!
        - User is not a member of the community group

---

### **4. Find Closest Group or Resource**
1. **Navigate to "Find Closest Group or Resource" Tab**:
   - Verify that the search form appears.
2. **Search for Closest Community Group**:
   - Provide valid inputs for `Latitude`, `Longitude`, and `Community Group Type`, using the dropdown menu where applicable.
   - Click "Find Closest Community Group".
   - **Expected Behavior**:
      - Console log: `Closest community group found: <response object>`.
      - Network tab shows a GET request to `/getClosestCommunityGroup`.
      - UI displays JSON object.
3. **Search for Closest Resource**:
   - Provide valid inputs for `Latitude`, `Longitude`, and `Resource Type`.
   - Click "Find Closest Resource".
   - **Expected Behavior**:
      - Console log: `Closest resource found: <response object>`.
      - Network tab shows a GET request to `/getClosestResource`.
      - UI displays JSON object.
