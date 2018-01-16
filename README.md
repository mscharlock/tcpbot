# Grover chatbot
I'm attempting a third time at making a helpful chat bot.

## Requirements for the chatbot
- Develop it using node
- Find out what product a user wants and provide price
- Record conversations, but not in a database

## What did I try in previous iterations?
Previously, I was trying to use MSFT's Bot framework that's on Azure, but I couldn't quite get the hang of the emulator. The language itself was fairly ok though (easier than trying to DIY AIML or learning Rivescript, but still shows skill, unlike using something like Recast.ai, etc.). What is a little challenging about this project is that there are a lot of different services that already provide a kind of plug-and-play access to LUIS - which would probably be the ideal in this case if you want a strong AI component to this. However, a lot of them come at a cost, and I don't know how important that is as a factor. Given time and problems getting the emulator to function, it seemed like TCP would be relatively fast, cheap, and functional, but I'm sacrificing some of the (possibly...?) better UX that might come from using a platform with built in AI or a way to "train" your bot.

## Plan for Building It:
1. ~~Get things returning in TCP~~
2. ~~Put all the info not in a database but in a giant object that we can reference from~~
(~~2a- cleanup: put all the stuff in an object~~
2b - Map out all the answers
2c - Do all the answers)
3. Store the data somehow
  - **Ideas:**
  - Put it in a buffer when somebody enters text, then read the buffer and translate that into html
  - createReadStream to a txt or something and then grab chunks from the txt to render on the html
  - LocalStorage and then pull it down, stringify the JSON, and manipulate the string to get the sections we want out of it?
  - InMemory storage???
4. Put it into a place that we can grab it to render it on HTML
(4a- functionality: make the individual typed statements become elements
4b - cleanup: make the rendered things look nice)

## Conversation Flow:
- Groverbot introduces itself, asks what you are looking for from a list (the categories listed in the sheet, eg Phones & Tablets).
- User types in one of the options
  - **To think about:** How to account for different spellings, multiple languages
- Groverbot says "Great, I'll get some info on [user input]."
  - **Not for MVP, but if I had all the time in the world**, Groverbot adds: "If you are looking for a specific brand, type yes. If not, type no and I will give you a list of options!"
  - If user types yes:
    - List all brands from items in the category
    - User selects a brand by typing the name
    - Options list for the brand with subscription price
    - Could get even more granular, asking things like "Do you want the most space possible?" for computing or something like that
  - If user types no: list all options and prices. **To think about**: It would be interesting to know if they want the bot to upsell, because that would change the way I would display results here maybe.
- Groverbot then shows a list of all options (names) with prices, linked to product page or subscription page.
  - **To think about**: Here would also be another place to upsell or prompt the user to subscribe right away if there is a separate subscription page for each item vs. just a description page.
