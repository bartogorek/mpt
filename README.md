#### Manufacturing Progress Tracker

Web app built as a learning execise, but with a purpose in mind : designed to
track progress in a manufacturing facility, so many large manufacturing
businesses still use excel spreadsheets (!!), so painful...

Here is a simple explanation of the concept :

  1. Works orders / jobs are loaded into database from .csv file (presumably
     downloaded from a planning system first).
  2. Last cell in production (quality control, dispatch) can see all
     outstanding works orders on the screen and complete as they receive
     finished good.
  3. Live progress is displayed on the screen.

The app has been built with a specific manufacturing unit in mind and due to my
limited coding skills, a lot of things have been hard-coded just to make it
usable in short space of time.

Next steps are :
  1. Make the app configurable so it can be used by wider range of users.
  2. Refactor poor quality/overcomplicated code - there is plenty of it!


