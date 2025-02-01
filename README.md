# X-Form-Builder

- wokeeyyy. Let's make a form builder :)

## Core req

- Form builder interface
  - DnD for form fields
  - [Sidebar for form elements | UI for my Form Previer | Config for form elements]
  - Configs to support
    - Labels, placeholder, validation rules and required / optional status
  - support single / two coulmns layouts (let's use grid to make it easy)

- Form preview and testing
  - Preview mode which the end users will see
  - form validation? html elements have built in validation we can such as
    email, number, etc
    should I support other custom validations?
  - support test mode to test the form submission
    - and ui to display submitted data

- Data management and API integration
  - create a mock api service to save and retrive form configurations
  - proper error handling for API calls
  - save / draft mode
  - form analytics showing submission counts and validation failure rates? (backend?)o

- Responsive Design and UE
  - works on different screen sizes
  - ui/ux
  - dnd operation feedback
  - loading state and error messages for async operations

- For sharing and management
  - generate sharable link for create forms
  - dashboard showing all created forms and their status
  - allow forms to be duplicated, archived or deleted
  - include basic form submission analytics

## Technical Req

- State management
  - implement undo / redo
  - form validation logic

- Routing and navigation
  - react router
  - protected routes (wait we need  to implement auth?)
  - deep linking to specific forms and forms sections

- Code organization
  - component based arc
  - typescript <3
  - documentation

- Performance
  - lazy loading for form elements
  - optimize rendering
  - handle form submission

### How should I start?

- let's setup react router (v7 library only), shadcn, dnd etc
- let's install all necessary shad components and libraries
  and think what to do :3
- tailwind@v4 breaks shadcn for now so lets opt for v3 now
