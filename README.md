# Gridit
Welcome to Gridit! 

Gridit is a tool to help visualize and plan 'grid stuff'. Grid stuff might be:
- Map or Level Design
- Algorithm visualization (pathfinding, rasterization, etc)
- Encounter Design
- Tilesets
- RPG Battle maps
- Games of tic-tac-toe or checkers or what-have-you
- Pixel Art
- Habit Tracking
- Whatever you can think of!

Gridit runs entirely in your local browser. Grids can be saved to a local JSON file and re-imported but otherwise do not persist. Gridit uses a flexible schema system which you can also parse and read yourself to translate data from Gridit to a game engine or other consumer.

 **[Play with it here!](https://prakkus.github.io/gridit/)**


### Features
- Configurable grid x/y size, cell size, and cell spacing.
- Cells support background color, background image, and multiple layers of 'text content' (which can be text, icons, etc).
- Configurable/editable schema values for cell data.
- Importing/slicing of tilesets.
- Local Save/Load of grid and schema data.




### Background

This started as a place for me to experiment with different (read: bad) JS architectures while also solving a common visualization problem we were having when talking about our grid-based games. I've since started to evolve it into something more cohesive and reasonable, but some dubious past decions may linger. Reference at your own risk!

I do have some specific technical goals for this project:
1) *No dependencies, no framework, no build* — Frontend dev has become _so heavy_. How far can I get with just JS modules now that the core language is more mature?
2) *Do things the JavaScript way* — To me that means avoiding classes and solving problems more functionally than I normally would. 
3) *Simple and consistent, yet flexible architecture* — Since it's just me working on it, I'm not worried about building in any guiderails. But I'll be working on it intermittently, so I want to be able to quickly jump back in and remember what's going on, as well as prototype new stuff quickly.
4) *Handle reasonably large grids with decent performance (64x64?)* — If someone does need large grids for some reason, it would be nice to handle that cleanly.
5) *Offline First* — In the same vein as having no dependencies, I wanted to build something that uses filesystem persistence with no cloud or server requirements. 
