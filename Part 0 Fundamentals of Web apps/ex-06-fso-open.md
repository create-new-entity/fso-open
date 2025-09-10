sequenceDiagram
    participant browser
    participant server

    Note right of browser: User creates a new note, browser updates the local notes list and sends a POST request to the server to add a new note.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created OK response {"message":"note created"}
    deactivate server