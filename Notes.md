# General app architecture planning and notes

## App flow

Research syncing between a db and local storage methods.
Maybe a use of a hash? if the hash of the remote workspace and local are the same, just load the local one first?

    How the apps user, drawer, and workspace flow should work.

    App launch ->

    Is user logged in?
        yes - Grab initialization data. See drawer step
        no  - prompt for login (maybe offer a mode that only saves a single workspace and loads it from local storage with a guest user)

    On user login ->
        immediately grab the id of the previously open workspace to load it
        also grab the list of workspaces
        these values will be used by the drawer context and workspaces context

    Load the initial workspace and list of workspaces ->
        once the first workspace is properly loaded, begin fetching the other workspaces in the background
