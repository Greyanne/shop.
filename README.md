# eShop App Documentation

## Live Demo
- [eShop](https://dashboard.ionicframework.com/preview/82adc52f/vjx45vtk2r)


## Introduction

Welcome to eShop, a simple e-commerce app that holds the potential to become a tangible solution for real-world users (let's just have a chuckle over the name, shall we?). I took on eShop as a learning project to explore some technologies I haven't worked with previously.

At its core, eShop offers a range of features to enhance the user experience. These features include product search, cart management, and guest checkout.

**Technology Stack**

- **[Ionic React](https://ionicframework.com/)**: Ionic React enables the creation of a dynamic and user-friendly interface, aligning perfectly with the mobile-oriented approach.

- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Redux toolkit simplifies the complexities of Redux, making the management of global states an intuitive and manageable process.

- **[Tailwind CSS](https://tailwindcss.com/)**: For easy visually appealing and responsive designs.

- **[Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup)**: To enhance user interactions and input validation.

- **[TypeScript](https://www.typescriptlang.org/)**: Enhancing code reliability and maintainability.

## Mock Data

- **[FakeApi](https://fakestoreapi.com/docs)**

## **Project Setup**

After reviewing the project brief and understanding the requirements, I delved into setting up my development environment:

1. Ionic React Boilerplate: The base and foundation of the app and since they boast of being the "The mobile SDK for the Web", I choose a mobile approach to the project.

2. Vite and Tailwind CSS Integration: Upon starting the ionic server and seeing it runs with Vite under the hood, I chose to install Tailwind CSS for Vite framework.

3. TypeScript Inclusion: The Ionic React boilerplate graciously included TypeScript.

4. Redux Toolkit Addition: Initially I managed to state with context and reducer API while learning Redux, I later introduced Redux toolkit when I had a firm grasp of the redux core concepts.

5. Formik and Yup: I integrated Formik and Yup during the guest checkout phase to help streamline form handling and validation, enhancing user interactions.

## 📍 **Global State Management**

In the initial phases, I relied on React Context and Reducer API to manage the global state. This decision was rooted in my existing comfort with these tools. I structured the state management around distinct contexts:

- **Shop Context**: This context fetches and maintains all products.

- **Cart Context**: Here, I focused on managing the cart's functionality. This included item addition, quantity adjustments, and removal.

- **Checkout Context**: This handles the guest checkout needs of the app i.e. handling user contact (delivery details) and payment details.
However, as I gained a better understanding of redux, I transitioned the state management to Redux Toolkit. This resulted in three dedicated slices to replace the context files:

- **ShopSlice**: Replaced shop context, fetched and managed all products.

- **CartSlice**: The CartSlice replaced the cartContext and managed cart functionalities.

- **CheckoutSlice**: Replaced the Checkout context and managed user details.

A major challenge during the process was losing state data when I refreshed the browsers. While local storage seemed like the go-to solution, I decided to explore Redux Persist. This addition ensured that both cart details and user interactions remained intact throughout the app's lifecycle, adding an extra layer of seamlessness to the experience and I didn't have to call `localstorage` setItem or getItem etc.

---

# 🛠️ Feature Implementations

## - Product Page Implementation

This was quite easy and seamless.

**Implementation Details:**

- **Fetching and Display**: Products were efficiently fetched and displayed using Axios.

- **Transition to Redux**: Transitioning to Redux introduced a challenge. Crafting an async reducer to manage product fetching presented a minor challenge until I discovered `createAsyncThunk`, a key Redux feature for asynchronous operations.

**Key Takeaways:**

My search for a way to handle async operations in my redux reducers introduced me to `createAsyncThunk` and better redux slice configurations with `extraReducers`.

## - Search Feature Implementation

The search feature filters and return the existing product pool based on search keywords.

**Implementation Details:**

- **Filtered Display**: From the products present in the Redux state, the search filters the products array from search keywords present in the product title.

- **Search Keyword Indication**: Beyond displaying filtered products, the feature includes a note showcasing the exact search keywords entered by the user. This added context enhances the user experience, allowing users to comprehend the presented results better.

**Challenges and Resolution:**

This implementation was relatively straightforward, given the presence of product data in the Redux state. The primary challenge was designing an intuitive user interface that seamlessly presented filtered products and highlighted the search keywords. This was resolved through thoughtful UI design and intuitive communication of the search query.

**Key Takeaways:**

The search feature's implementation shows the importance of efficient data handling in Redux. Additionally, by providing a context-sensitive note, the feature improves the user experience by offering clarity on the searched terms and the corresponding results.



## - Add to Cart Feature Implementation

The "Add to Cart" functionality allows users to manage their selected products, ensuring a dynamic and user-friendly shopping experience.

**Implementation Details:**

- **Add to Cart Logic**: Each product component on display has an "Add to Cart" button, when clicked, it identifies the product's unique ID and scans the cart array within the cartSlice. If the product already exists in the cart, the add-to-cart reducer increments the quantity of that specific item within the array.

- **Product Absence Handling**: In cases where the product doesn't exist in the cart. An API call is made to fetch the product from the API, using the provided ID. Subsequently, the product, along with a quantity count of 1, is added to the cart array.

- **Quantity Adjustment and Removal**: Beyond adding products, the functionality extends to quantity adjustments and removals. The decrement reducer handles quantity reduction for items with a specific ID, while the remove reducer orchestrates the removal of an entire product from the cart array.

**Challenges and Resolution:**

The main challenge here was in striking a balance between existing product management and adding new items to the cart. This was resolved by the logic that dynamically managed both scenarios - incrementing existing items' quantities and fetching new items when required.

**Key Takeaways:**

The "Add to Cart" feature makes the shopping process easier. It helps users add items to the cart, increment or decrement quantity or remove them completely from the cart.


## - Guest Checkout Feature Implementation

The "Guest Checkout" feature collects and manages user contact and payment details

**Implementation Details:**

- **Form Validation with Formik and Yup**: The user contact and payment details are captured through their respective forms. Form inputs are validated using Formik and Yup, ensuring accurate and complete information is submitted.

- **Storage in Checkout State**: The collected user details are saved in the checkout state.

- **Editing and Updating**: Flexibility is key. Users can edit and update both contact and payment details, allowing adjustments as needed.

- **Validation and Checkout Constraint**: Users are unable to proceed to checkout if either contact or payment details are incomplete or missing. This ensures a smooth, error-free checkout process.

**Challenges and Resolution:**

The primary challenge here was guaranteeing both accurate data submission and validation. This challenge was resolved through the integration of Formik and Yup, which together forms a mechanism for handling user inputs and ensuring data correctness.

**Key Takeaways:**

Collecting and validating user data properly is very important. Using `Formik` and `Yup`, ensures that user inputs are valid.

## - Checkout Process Implementation

The "Checkout Process" ensures that all necessary steps are fulfilled before proceeding with the final order placement.

**Implementation Details:**

- **Cart Review and Prerequisites Check**: Before a user checks out their cart, a cart summary is presented to the user. The process further involves verifying that both contact and payment details have been successfully entered and saved by the user.

- **Order Confirmation and Success Feedback**: Upon confirming the prerequisites, users are empowered to proceed with the order. The checkout process concludes with the display of a success message, conveying the seamless placement of the order.

- **Error Handling for Missing Data**: In cases where prerequisites are not met, an intuitive error feedback is displayed. Users are notified of the missing components – whether it's items in the cart, contact details, or payment information.

**Challenges and Special Features:**

The central challenge centred around ensuring a smooth and intuitive process from cart review to successful order placement. The integration of prerequisites and error feedback was necessary to achieve this.

**Key Takeaways:**

The "Checkout Process" encapsulates the essence of a successful e-commerce journey, characterized by meticulous checks, intuitive order placement, and error-resilient feedback. By enforcing prerequisites and providing clear feedback, eShop ensures an engaging and successful conclusion to each transaction.


---

# ❗️ Error Handling

To address potential error scenarios, I've implemented checks to handle error displays both on pages and forms
- **Error Component**: This component displays when fetching products fail.

- **Alerts and Helpers**: Alerts and form helpers are also used to promptly notify users of errors. This ensures that users know what went wrong and how to fix it.


# 📱💻🖥️ Responsive Design

To ensure a seamless user experience across diverse devices and orientations, using Tailwind CSS's utility screen width features,
I strategically crafted the user interface to dynamically adapt to various screen sizes while still maintaining a more mobile approach. 


---
# How to run
### Prerequisites

Before you start, make sure you have the following installed on your system:

1. **Node.js:** Visit the official Node.js website [here](https://nodejs.org/) and download the LTS version suitable for your operating system. Node.js comes with npm (Node Package Manager) which is required for managing dependencies.

2. **Ionic CLI:** Install the Ionic CLI globally on your system using the following command:

```bash
npm install -g @ionic/cli
```

### Running the Application
1. Clone the Repository: Start by cloning this repository to your local machine using Git:

```bash
git clone https://github.com/iamifechi/eShop.git
```

2. Navigate to the Project Directory: Move into the cloned project directory and install dependencies

```bash
cd eshop && npm install
```
3. Run the Development Server: Launch the Ionic development server to see the app in action:
```bash
ionic serve
```

---

# 🙏🏾 Conclusion

Building `eShop` has been an enriching journey as it not only reflects my growth but also presents a potential avenue for a real-world application. It has been quite fun and insightful discovering state management with the `Redux toolkit` and utility styling with `Tailwind CSS`. 

Figuring out both the UI design layout/structure and the features' functionality proved a bit challenging but taking some hints from already existing e-commerce platforms took care of the UI flow dilemma while I focused more on the features' functionalities. 

Challenges in UI and system design were overcome through research and looking out for best practices, while future plans include a more intuitive flow, enhanced security, and additional features like order history and wishlist feature. This learning journey has solidified my commitment to continuous learning and development.



Feel free to test the app and share your thoughts, reviews, suggestions, or feature requests with us. I am eager to hear from you and continuously improve the eShop experience based on your feedback. --> 📩 ifechi.dev@gmail.com
