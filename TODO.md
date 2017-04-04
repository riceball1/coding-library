TODO LIST
----------

```
Created On: March 31, 2017
Last Modified: April 3, 2017
````

This is a todo list created after already setting up a node/express/mongodb api, and creating a react/redux application with login/signup using jwt 

## Snippets

- [ ] snippet should populate with data when selecting on a specific snippet

- [ ] replace snippet textarea with codemirror

- [x] snippets should be only those of current user (fix in API)

## Notifications

- [ ] Create flash messages whenever user completes tasks (e.g., saved snippet, signed in, logged in, deleted snippet, updated snippet)
    - Update: Only add flash messages for login/signup and errors

## Search

- [x] Create GET request to retreive specific snippets
    - Note: Where will the search result show? Does it replace the snippets that are already in the sidebar?
    - Update: Typing in a search should narrow items in sidebar
    - Resource: https://medium.com/@yaoxiao1222/implementing-search-filter-a-list-on-redux-react-bb5de8d0a3ad


## Sidebar

- [ ] Sidebar button can be animated to make (UI/UX addition)

- [ ] Add handler for 'Settings' - can be popup modal

- [ ] Improve style of individual snippet previews

## Testing

- [ ] Add enzyme testing
