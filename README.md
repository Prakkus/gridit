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


### Architecture
The app is broadly split into the 'Data Layer' which consists of the core engine, and the 'View Layer' which displays the data and facilitates user interaction. The Data Layer is essentially a blob of state which can be read from or written to using specific patterns. The View Layer is responsible for watching the Data Layer and keeping the DOM in sync with it, which it does by hooking into the Actions or Mutation relevant to a given view.

JavaScript web apps all end up having to solve the problem of "how do I keep the DOM up to date as the app state changes". I could have used React or Vue or Svelte here, or rolled my own version of one of their approaches (I like Vue's the best, I think), and I even had something Redux-like implemented initially, but I wanted to try something less 'magical'. With that in mind, The core app is decoupled from any rendering and will happily execute whatever logic you'd like, packaged as 'Actions' (business logic) or 'Mutations' (atomic state changes). Views can subscribe to those as events and re-render themselves based on what the app broadcasts as occuring. This does mean that if some new data is added, I have to actually think about which pieces of UI will need to update based on that and mark them as such. Generally it's "the elements you just modified to display that new data" though, so I don't expect that'll be a big problem on an app this straightforward.

The exception to all this is the cells themselves, which are rendered in an 'update loop' rather than as syncronous events. They get marked as dirty and dirty cells are updated in batches each animation frame. This makes it easy to batch those updates together and 'unblock' the main thread to keep things running smoothly, even on large grids, and helps debounce input events and deduplicate cell updates.


#### Data Layer
**AppState** - The core representation of the app's state. It contains all the grid settings, cell data, and so on.

**Selectors** - Selectors read some subset of data from state. All data access is done through selectors. Originally this was because they were going to do other stuff like subscribing to automatic updates, but at this point it's just so that nothing needs a direct reference to the state and thus can't accidentally mutate it.

**Mutations** - Mutations change some atomic aspect of the state. All changes to the state are done via mutations. This makes it simple for views to subscribe to different pieces of data and re-render accordingly.

**Actions** - Actions compose mutations into units of 'business logic' which can be executed.

#### View Layer
**Views** - Views hook into the state, read data from it, and render that data into the DOM. They are intended to be independent, 'drop-in' modules which can be mounted wherever and then keep themselves updated by subscribing to the mutations they care about.

**Components** - Components act as interfaces to a DOM hiearchy, effectively controlling it directly. Data flows into them from views or parent components only when their Render function is called.