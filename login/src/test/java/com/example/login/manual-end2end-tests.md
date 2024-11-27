# Manual End-to-End Testing Documentation for Admin and General Users

## General Notes
- **Expected outcomes** include:
    - Alerts for input validation issues.
    - Console logs for success or error scenarios.
    - Network requests to the appropriate endpoints for valid inputs.
    - Any other UI message or output.
- Use **Inspect Element/Developer Tools** (Command + Option + J for Mac) to verify network requests and console logs.

---

## Admin Functionalities

### **1. Add Community Group**
1. **Login as Admin**:
    - Navigate to the login page and enter valid admin credentials.
    - Verify successful login and redirection to the Admin Dashboard.
2. **Click "Add Community Group" Button**:
    - Verify that the "Add Community Group" form appears.
3. **Fill in the Form**:
    - Provide valid inputs for all fields.
        - Example:
          ```
          Community Name: Test Community
          Community Type: MENTAL_HEALTH
          Latitude: 37.7749
          Longitude: -122.4194
          Capacity: 100
          Description: This is a test community.
          ```
4. **Submit the Form**:
    - Click the "Add Community Group" button.
    - **Expected Behavior**:
        - No alerts appear (valid inputs).
        - Console log: `Community group added: <response object>`.
        - Network tab shows a POST request to `/createCommunityGroup`.
5. **Invalid Input**:
    - Example invalid inputs:
        - Blank `Community Name`.
        - Negative `Capacity`.
        - Latitude or longitude out of range.
    - **Expected Behavior**:
        - Alerts:
            - `Community name cannot be empty.`
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
          Resource Name: Test Shelter
          Resource Type: SHELTER
          Latitude: 37.7749
          Longitude: -122.4194
          Resource Hours: 9AM-5PM
          Description: A test shelter for validation.
          ```
3. **Submit the Form**:
    - Click the "Add Resource" button.
    - **Expected Behavior**:
        - No alerts appear (valid inputs).
        - Console log: `Resource added: <response object>`.
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
    - Enter a valid `Community ID`.
        - Example: `Community ID: 1`.

3. **Submit the Form**:
    - Click the "Delete" button.
    - **Expected Behavior**:
        - Console log: `Community Group deleted: <response object>`.
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
    - Enter a valid `Resource ID`.
        - Example: `Resource ID: 10`.

3. **Submit the Form**:
    - Click the "Delete" button.
    - **Expected Behavior**:
        - Console log: `Resource deleted: <response object>`.
        - Network tab shows a DELETE request to `/deleteResource`.
        - User-facing success message: None (console-only logging for now).
4. **Invalid Input**:
    - Example invalid inputs:
        - Non-existent or blank `Resource ID`.
    - **Expected Behavior**:
        - Console error: `Error deleting resource: <error message>`.

---

## General User Functionalities

### **1. Create User**
1. **Login as General User**:
    - Navigate to the login page and enter valid general user credentials.
    - Verify successful login and redirection to the General Dashboard.
2. **Navigate to "Create User" Tab**:
    - Verify that the "Create User" form appears.
3. **Fill in the Form**:
    - Provide valid inputs for all fields.
        - Example:
          ```
          Name: Test User
          Email: testuser@example.com
          Age: 25
          Sex: MALE
          Latitude: 37.7749
          Longitude: -122.4194
          ```
4. **Submit the Form**:
    - Click the "Create User" button.
    - **Expected Behavior**:
        - No alerts appear (valid inputs).
        - Console log: `User created: <response object>`.
        - Network tab shows a POST request to `/createUser`.
5. **Invalid Input**:
    - Example invalid inputs:
        - Blank `Name`.
        - Invalid `Email`.
        - Negative `Age`.
    - **Expected Behavior**:
        - Alerts:
            - `Name cannot be empty.`
            - `Invalid email address.`
            - `Age cannot be negative.`
        - No network requests are made for invalid inputs.

---

### **2. Manage Community Group Membership**
1. **Navigate to "Manage Community Group Membership" Tab**:
    - Verify that the membership management form appears.
2. **Add to Community Group**:
    - Enter a valid `User ID` and `Community Group ID`.
    - Click "Add to Community Group".
    - **Expected Behavior**:
        - Console log: `User added to community group: <response object>`.
        - Network tab shows a POST request to `/addUserToCommunity`.
    - Invalid inputs (e.g., non-existent IDs):
        - Alert: `Invalid User ID or Community Group ID.`
3. **Remove from Community Group**:
    - Enter a valid `User ID` and `Community Group ID`.
    - Click "Remove from Community Group".
    - **Expected Behavior**:
        - Console log: `User removed from community group: <response object>`.
        - Network tab shows a DELETE request to `/removeUserFromCommunity`.
    - Invalid inputs:
        - Alert: `Invalid User ID or Community Group ID.`

---

### **3. Find Closest Group or Resource**
1. **Navigate to "Find Closest Group or Resource" Tab**:
    - Verify that the search form appears.
2. **Search for Closest Community Group**:
    - Provide valid inputs for `Latitude`, `Longitude`, and `Community Group Type`.
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
4. **Invalid Input**:
    - Example invalid inputs:
        - Latitude or longitude out of range.
    - **Expected Behavior**:
        - Alerts:
            - `Latitude must be between -90 and 90.`
            - `Longitude must be between -180 and 180.`
        - No network requests are made for invalid inputs.