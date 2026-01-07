## RestCountries Api -React Project

## Reflection

## Overview

Thisproject, is aimed to build a country details web application using React with TypeScript. The app displays a list of countries and their detailed information, such as population, nam,e, languages, and borders, fetched from an API. I used React Router for page navigation and React Context API to manage global state across components, ensuring a smooth user experience.

## Features

Countries List: Displays a grid of country cards.
Country Details: Click on any country card to view detailed information like name, population, capital, languages, currencies, etc.
Search: A search box that allows users to search countries by name.
Filter: Allows users to filter countries by region (Africa, Americas, Asia, Europe, Oceania).
Navigate: between border countries
Dark Mode Toggle: Users can toggle between light and dark themes.
Responsive Design: The application adapts to various screen sizes (mobile, tablet, desktop).
Accessibility: Accessible features like ARIA labels, and focus management.

## How it Works & Workflow

Data Flow (Step-by-Step):

Initial Page Load:
On the homepage the app loads country data from an external API (https://restcountries.com/).
Data is fetched asynchronously using the useFetch hooks
Displaying Countries:
The country cards are dynamically generated and displayed in a grid layout.
Each card contains a flag, country name, population, region, and capital.

Search:
When users type in the search box, the list of countries is filtered dynamically to match the search input.

Filter by Region:
Users can select a region from the dropdown filter to display only countries in that region.

Country Detail View:
When a user clicks on a country card, they are redirected to the details page .
The details page loads the selected country’s information (e.g., languages, currencies, border countries) using its country code (code).

BorderCountries: When a user clicks on a Border Country in the detail page , the application performs a seamless transition to that country's profile.

Dark/Light Mode:
The app saves the user's theme preference (light or dark) in the browser's local storage.
The theme is switched using the dark mode toggle button.

## Technologies Used

-  **React**: For building the user interface.
-  **TypeScript**: Ensures type safety throughout the application.
-  **CSS**: For styling the app with a responsive design.
-  **React Router**: For handling routing between pages (Country List and Country Detail).
-  **Custom Hooks**: Used for handling API calls (e.g., `useFetch`).
-  **API Integration**: The app integrates with an external API (e.g., REST Countries API) to fetch data on countries

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/country-info-app.git
   ```
2. Navigate to the project folder:
   ```bash
   cd country-info-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server:

```bash
npm run dev
```

### Workflow Overview

1. App Initialization

When the app loads, the App component sets up the initial routes using React Router. The main components that are involved in navigation are:
CountryPage(HomePage): Displays the list of countries and provides the search and filter functionality.
CountryDetailsPage: Displays detailed information about a single country when a user clicks on a country card.

2. Global State with ThemeContext

App Component wraps the entire application with the ThemeContextProvider. This context is used to manage global theme settings (like light/dark mode), and the app can access and update the theme state using the context.
ThemeContextProvider initializes the theme state (light or dark mode) using useState
Components like Header, SearchBar, CountryCard, and CountryDetailsPage can access the current theme from the context and update the theme if needed.

3. Fetching Data with Custom Hook

The app uses a custom hook (useFetch) to fetch data from an API:
In the HomePage component, useFetch is invoked to fetch the list of countries. It takes care of fetching the countries' data and handling loading and error states.
The useFetch hook provides the fetched data, loading status, and error message. This data is passed down to child components like CountryCard for rendering.

4. Components and Data Flow

CountryCard Component:

Displays a preview of each country (name, population, region).
Receives country data as props from HomePage and displays it.
When clicked, it navigates to the CountryDetailsPage using React Router's Link component, passing the countryCode as part of the URL.

CountryDetailsPage:

Displays detailed information about a country, including languages, currency, and borders.
The countryCode is retrieved from the URL using React Router’s useParams hook.
It uses the useFetch hook again to fetch the detailed country information, and the data is rendered based on the result.

SearchBar Component:

Allows users to search for countries by name.
Updates the search query in the local state of HomePage and filters the countries list based on the user input.

Filter Component:

Allows users to filter countries by region (e.g., Africa, Europe, etc.).
Similar to the search bar, it updates the region filter in the local state of HomePage and updates the list of displayed countries.

5. Data Flow & Updates

User Interaction:

When a user types a search query in the SearchBar component or selects a region from the Filter dropdown, the state in HomePage is updated, and the list of countries is filtered based on the query or region.

ThemeContext provides access to the current theme (light/dark mode), which allows components to adjust their styles accordingly.

API Data Fetching:

The useFetch hook is responsible for fetching the country data when the app first loads and when users navigate to a country's detailed page. It ensures that data is fetched asynchronously and that the UI reflects loading or error states as needed.

6. Folder Structure

The folder structure is designed for modularity:

components/ contains reusable UI components such as CountryCard, CountryList, SearchBar, Filter, Header, Border, Spinner, ErrorMessage.
pages/ contains the main page components like CountriesPage(HomePage) and CountryDetailsPage.
hooks/ contains custom hooks such as useFetch for data fetching logic amd useLocalStorage.
ontexts/ contains the ThemeContext, which provides the global theme state for the entire app.
Types/ Cointains Interfaces
utils/ holds helper functions like formatting utilities.
App.tsx, main.tsx

7. How Pages, Components, and Context Are Connected

Pages like HomePage and CountryDetailsPage import and render components (such as CountryCard, SearchBar, Filter) to display data.
ThemeContext is used across the app to manage and provide access to the theme (light/dark mode) in components such as Header, CountryCard, and CountryDetailsPage.
Custom Hooks like useFetch are used to fetch data, which is then passed down as props to components like CountryCard and CountryDetailsPage.
React Router handles navigation between pages, and components access data and state through context and props.

8. React Router and Navigation

React Router enables navigation between pages. When a user clicks on a country in HomePage, the app navigates to the CountryDetailsPage where the selected country's data is fetched and displayed.

## Component Relationship

1. CountriesPage(HomePage)

HomePage is a page component that acts as the container for the main country listing view.
Responsibilities:
Fetches the full list of countries using useFetch.
Manages local state for search query and region filter.
Passes the filtered list of countries as props to the CountryList component.

Children:
SearchBar
Filter
CountryList

2. CountryList

CountryList is a component responsible for rendering a collection of countries.
It does not fetch data itself; it receives the filtered country data as props from HomePage.
It iterates over the list of countries and renders a CountryCard for each country.

Children:
CountryCard (one for each country in the list)

3. CountryCard

CountryCard is a reusable UI component that displays brief information about a single country (name, population, region, flag, etc.).
Each card is clickable. When clicked:
It navigates to CountryDetailsPage using React Router, passing the countryCode in the URL.

Props received:
Country data from CountryList

4. CountryDetailsPage (or CountryPage)

CountryDetailsPage is a page component that shows detailed information about a single country.

Responsibilities:
Retrieves the countryCode from the URL using useParams.
Fetches detailed country data using useFetch.
Optionally fetches data about border countries and renders them as CountryCard or buttons.

Relation to the other components:
CountryDetailsPage is the destination page when a user clicks a CountryCard in CountryList.
It does not use HomePage or CountryList directly, but may reuse CountryCard for borders or related countries.

5. Data Flow & Navigation

HomePage fetches all countries → filters based on search/region → passes to CountryList.
CountryList iterates over the data → renders a CountryCard for each country.
User clicks a CountryCard → navigates to CountryDetailsPage (/country/:code).
CountryDetailsPage fetches details for that specific country → displays them.
Optional: CountryDetailsPage may render CountryCard components for border countries.

## Challenges

1. Border Countries Display (3-letter codes → full names)

Chaleenges:
The main issues were:
The border countries were given as country codes from the API, not the full country names.
Navigation to the border countries wasn't working as expected.
Problem with Border Countries

Solution
Mapped the border country codes to their respective country names and then made them clickable, so they correctly navigate to the respective CountryDetailsPage.

const borderCountriesData = borderCodes?.map(code => countries.find(country => country.alpha3Code === code)?.name);

2. TypeScript Error: data.length red line

Challenges:
TypeScript complains because data might be undefined initially.

Solution:
Use optional chaining or check the array first:

if (!data || data.length === 0) {
return <p>Country not found</p>;
}

Or define data type properly in your useFetch hook:

const { data, loading, error } = useFetch<CountryDetail[]>(
`https://restcountries.com/v3.1/all`
);
Make sure useFetch returns data as CountryDetail[] | null to satisfy TypeScript.

3. Component Naming: Header vs Navbar

Challenges:
Confusion between "Header" and "Navbar".

Solution:
Header → general top section (can contain logo, title, theme toggle).
Navbar → specifically the menu/navigation links.

4. Managing Navigation Between Country Details and List

Challenge:
Navigating from the CountryList to CountryDetailsPage was initially tricky, especially when handling the URL and ensuring that clicking on a country correctly opened the respective details page.

Solution:
Used React Router to pass the countryCode (or alpha3Code) in the URL. The CountryDetailsPage then used useParams to extract that code and fetch the corresponding country data.

5. Responsive Design Issues

Challenge:
Ensuring that the application worked well on all screen sizes (especially mobile) was challenging. Some elements like the header, cards, and modals needed adjustments for smaller devices.

Solution:
Used CSS media queries and flexbox layouts to ensure responsiveness. We tested on multiple devices and adjusted the design to ensure it looked good on both small and large screens.

6. Theme Switching

Challenge:
Implementing the dark/light mode toggle based on ThemeContext caused some styling inconsistencies. For example, the border colors and text contrast weren’t ideal for the dark mode.

Solution:
Created CSS variables to manage color changes and made sure the theme switcher updated the global state through the ThemeContext, ensuring consistent styling across the app.

## What I Learned

-  Improved understanding of React hooks and dependency management
-  Learned to structure reusable components with TypeScript
-  Gained experience handling API data and edge cases
-  Refaactoring the pages

## Deployment URL

https://revathirao.github.io/-Project_React_RestCountriesAPI/
