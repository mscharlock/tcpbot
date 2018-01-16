# Grover chatbot
I'm attempting a third time at making a helpful chat bot.

## Requirements for the chatbot
- Develop it using node
- Find out what product a user wants and provide price
- Record conversations, but not in a database

## What did I try previously
Previously, I was trying to use MSFT's Bot framework that's on Azure, but I couldn't quite get the hang of the emulator. The language itself was fairly ok though (easier than AIML or Rivescript). What is a little challenging about this project is that there are a lot of different services that already provide a kind of plug-and-play access to LUIS - which would probably be the ideal in this case if you want a strong AI component to this. However, given time and problems getting the emulator to function, it seemed like TCP was the way to go.

## Plan for Building It:
1. ~~Get things returning in TCP~~
2. ~~Put all the info not in a database but in a giant object that we can reference from~~
(2a- cleanup: put all the stuff in and all the answers)
3. Store the data somehow
  - **Ideas:**
  - Put it in a buffer when somebody enters text, then read the buffer and translate that into html
  - createReadStream to a txt or something and then grab chunks from the txt to render on the html
  - LocalStorage and then pull it down, stringify the JSON, and manipulate the string to get the sections we want out of it?
  - InMemory storage???
4. Put it into a place that we can grab it to render it on HTML
(4a- functionality: make the individual typed statements become elements
4b - cleanup: make the rendered things look nice)
