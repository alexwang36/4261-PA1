### How to Run
If npm is not installed, run `npm install` in your terminal
Run `npm run dev`
Open [http://localhost:5173/](http://localhost:5173) to view it in your browser.
The page will reload when you make changes.


### Key Features:
-Displays the temperature, humidity, and wind speed of any city on Earth. I used the OpenWeatherMap API to fetch real-time data based on user queries. I also account for edge cases: if a user does not enter any text in the search bar, or if they enter a city name that does not exist, my app will alert the user about this. 
-Weather icons (sunny, cloudy, rainy, snowing) that change based on what type of weather 
-Simplistic and intuitive user design. Contrasting colors make it very easy to view whether you are in light or dark mode. Pretty font custom choice. 
-(This is not my feature. This feature was added by my partner) Can add your name to visitor list, which (on purpose) is stored locally and disappears every time the app is re-opened. This contrasts the search history which is stored in the Firebase database.


### Exceptional Work:
-Notification system - if a user ever searches for Atlanta, they will receive a popup notification with a title ‘Atlanta’ and a body ‘Home of Georgia Tech’. 
-Receives and stores user input (past search history) in a real-time Firebase database. Then it displays this user input in the app. Past search history is maintained even when you close and re-open the app.
-Pulled in data from a third-party service not on my device or database (used OpenWeatherMap API)


### Resources Used:
Basic Weather App Tutorial: https://www.youtube.com/watch?v=zs1Nq2s_uy4&ab_channel=GreatStack
Using Firebase in React: https://samuelbankole.medium.com/google-firebase-in-react-1acc64516788
Aligning elements in CSS: https://medium.com/12-developer-labors css-all-the-ways-to-align-elements-left-and-right-52ecce4a4af9
