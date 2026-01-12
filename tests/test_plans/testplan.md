**Executive Summary**

- **Scope**: Test the application's baseURL (login page at https://www.saucedemo.com/) and immediate post-login inventory page flows.
- **Goals**: Verify authentication behavior, input validation and error handling, basic inventory interactions after login, accessibility and resilience to edge cases.
- **Test Types**: Functional, validation, negative, accessibility, session/persistence, and basic security edge cases.

**Assumptions**

- Tests start from a fresh browser session with no prior cookies/storage.
- Test environment is reachable at baseURL configured in Playwright.
- Known test accounts exist (based on Sauce Demo):
  - standard_user / secret_sauce (expected successful)
  - locked_out_user / secret_sauce (expected locked error)
  - problem_user / secret_sauce (behavior differences)
  - performance_glitch_user / secret_sauce (timing issues)

**Page Elements (discovered)**

- **Username input**: `#user-name`
- **Password input**: `#password`
- **Login button**: `#login-button`
- **Error message**: `[data-test="error"]`
- **Inventory title**: `.title` (expected text "Products")
- **Add to cart**: `button[data-test="add-to-cart-sauce-labs-backpack"]`

**Success Criteria**

- Login with valid credentials navigates to inventory page and shows `Products` title.
- Invalid credentials show a visible error message and remain on login page.
- Edge-case inputs do not expose stack traces; errors are user-friendly.

**Failure Conditions**

- Silent failures (no error and no navigation) on invalid login.
- Crash or unhandled exception returned in UI.
- Missing or incorrect selectors preventing core flows.

**Test Scenarios**

### 1. Happy Path — Successful Login

Assumption: Fresh session, baseURL loaded.

Steps:
1. Navigate to baseURL.
2. Enter `standard_user` in Username.
3. Enter `secret_sauce` in Password.
4. Click Login.

Expected:
- Browser navigates to inventory page.
- `.title` text equals `Products`.
- No error message displayed.

Success: Inventory page shown with title `Products`.
Failure: Remains on login page or error visible.

### 2. Invalid Credentials — Wrong Password

Assumption: Fresh session.

Steps:
1. Go to baseURL.
2. Enter `standard_user` in Username.
3. Enter `wrong_password` in Password.
4. Click Login.

Expected:
- Error message appears via `[data-test="error"]`.
- Remains on login page.

Success: Error shown and no navigation.
Failure: Any navigation or missing error.

### 3. Locked Out User

Assumption: Fresh session.

Steps:
1. Go to baseURL.
2. Enter `locked_out_user` / `secret_sauce`.
3. Click Login.

Expected:
- Specific locked-out error shown.
- No navigation to inventory.

### 4. Empty Fields Validation

Assumption: Fresh session.

Steps:
1. Load baseURL.
2. Click Login without entering username/password.

Expected:
- Error message(s) indicating required fields.
- No navigation.

### 5. Whitespace / Leading-trailing Input Handling

Assumption: Fresh session.

Steps:
1. Enter ` standard_user ` (with surrounding spaces) and ` secret_sauce `.
2. Click Login.

Expected:
- Either trim and login succeeds, or error appears consistently.

### 6. Long Input / Overflow / Injection Attempts

Assumption: Fresh session.

Steps:
1. Enter a very long string (e.g., 5000 chars) into username and password.
2. Click Login.

Expected:
- App handles input gracefully (validation or error) without crashing.
- No stack traces or raw server errors exposed to UI.

### 7. Keyboard Accessibility

Assumption: Fresh session.

Steps:
1. Focus `#user-name` via Tab.
2. Tab to `#password` and then to `#login-button`.
3. Press Enter while focused on inputs and button.

Expected:
- All controls reachable by keyboard.
- Enter triggers login.

### 8. Paste and Input Methods

Assumption: Fresh session.

Steps:
1. Paste credentials into username/password fields.
2. Click Login.

Expected:
- Paste accepted; login proceeds as expected.

### 9. Post-login: Add Product to Cart

Assumption: Successful login to inventory page.

Steps:
1. On inventory page, verify `.title` equals `Products`.
2. Click `button[data-test="add-to-cart-sauce-labs-backpack"]`.

Expected:
- Product added to cart (visual change or cart count increment).
- No errors on click.

### 10. Session / Logout / Back Navigation

Assumption: Logged-in session.

Steps:
1. Log in as `standard_user`.
2. Navigate to inventory page.
3. Use UI to log out (if available) or clear session cookies.
4. Attempt to go back to inventory URL directly.

Expected:
- After logout or session clear, direct navigation to inventory redirects to login.
- No access without authentication.

### 11. Performance & Timing (for `performance_glitch_user`)

Assumption: Environment includes `performance_glitch_user`.

Steps:
1. Login using `performance_glitch_user` / `secret_sauce`.
2. Measure time to navigation and inventory render.

Expected:
- App eventually navigates and renders; timeouts handled in test harness.

### 12. Problem User Visual/Functional Anomalies

Assumption: `problem_user` exists and is allowed to login.

Steps:
1. Login as `problem_user`.
2. Verify inventory content and image loading.

Expected:
- Note any UI anomalies (broken images, incorrect links) in bug report.

**Negative / Security Edge Cases**

- SQL/Script injection attempts should be sanitized and not executed.
- Rate limit / brute force behavior: repeated failed attempts produce consistent error responses and no sensitive data leakage.

**Accessibility Checks (a11y)**

- All interactive elements have accessible names and are reachable via keyboard.
- Error messages are announced to screen readers (use aria-live or similar).
- Color contrast for input borders and error text meets AA standards.

**Test Data & Credentials**

- Standard: `standard_user` / `secret_sauce`
- Locked: `locked_out_user` / `secret_sauce`
- Problem: `problem_user` / `secret_sauce`
- Performance: `performance_glitch_user` / `secret_sauce`

**Notes for Automation**

- Use the selectors discovered in `pages/LoginPage.ts` and `pages/InventoryPage.ts`.
- Add retries or increased timeouts for `performance_glitch_user` scenarios.
- Keep tests idempotent: reset app state (cart clears) between tests.

**Deliverables**

- This markdown test plan saved at `tests/test_plans/baseURL_testplan.md`.
- Individual automated tests can be created referencing the `LoginPage` and `InventoryPage` page objects.
