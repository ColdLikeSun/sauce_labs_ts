# Sauce Labs Demo with Playwright

This project contains a suite of Playwright tests for the Sauce Labs demo website (https://www.saucedemo.com). It's a sample project to demonstrate automated testing with Playwright and to explore the use of AI tools in software testing.

## Tests

This project includes the following tests:

*   **Login E2E Tests (`login_e2e.spec.ts`)**:
    *   **Happy Path**: Tests successful login with a standard user.
    *   **Invalid Credentials**: Ensures an error message is shown for incorrect passwords.
    *   **Locked Out User**: Verifies that a locked-out user cannot log in.
    *   **Empty Fields**: Checks for validation errors when both username and password are empty.
    *   **Whitespace Handling**: Tests if leading/trailing whitespace in credentials is trimmed or handled correctly.
    *   **Add to Cart**: Verifies that a user can add a product to the cart after logging in.
    *   **Keyboard Accessibility**: Ensures that the login form is accessible and usable with only a keyboard.
    *   **Performance Glitch User**: Tests the login flow for a user that experiences performance issues, with a longer timeout.

*   **Add Item to Cart and Verify Price (`add_item_to_cart_verify_price.spec.ts`)**:
    *   Logs in as a standard user.
    *   Adds a specific item to the cart.
    *   Navigates to the cart.
    *   Verifies that the price of the item in the cart matches the price displayed on the product page.

*   **Add Multiple Items and Verify Total (`add_multiple_items_verify_total.spec.ts`)**:
    *   Logs in as a standard user.
    *   Adds multiple items to the cart.
    *   Navigates to the cart.
    *   Verifies that the total price of all items in the cart is calculated correctly.

*   **Long Input Validation (`long_input_validation.spec.ts`)**:
    *   Tests how the application handles very long strings (5000 characters) in the username and password fields.
    *   Ensures that the application does not crash or expose sensitive information when handling long inputs.

*   **Seed (`seed.spec.ts`)**:
    *   A placeholder test file.

## Getting Started

To run the tests, you'll need to have Node.js and npm installed.

1.  Clone this repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the tests:
    ```bash
    npx playwright test
    ```

## Contributing

This is a personal project for learning and experimentation. Feel free to fork it and play around with it.
