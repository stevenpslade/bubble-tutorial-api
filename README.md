# Unnamed Bubble Tutorial (Rails API)

Bubble Tutorials allows users to put beautiful, engaging tutorials on their website.

## How It Works

- User signs up on our admin site and receives a script to copy on to their website
- User can create tutorials with steps/content such as number of items in tutorial, content, actions, etc.
- This script communications with our Rails API, which sends the tutorial data to the site
- The script on the user's website displays the tutorials

This project is still in development. To see what's going on in my head and project TODOs  [visit my public Trello board](https://trello.com/b/oflmtBIf/bubble-tutorial).

## Example Output

`http://api.stevenlocal.com:3000/v1/sites/1/tutorials`

```json
{
  "data": [
    {
      "id": "1",
      "type": "tutorials",
      "attributes": {
        "name": "Test Tutorial",
        "page_url": "www.example.com/lobby",
        "skippable": false,
        "show_steps": true,
        "active": true,
        "tutorial_items": [
          {
            "id": 1,
            "title": "Step1",
            "content": "test",
            "active": true,
            "tutorial_id": 1,
            "order": 1,
            "css_selector": "#subscribe-button",
            "created_at": "2017-04-02T07:04:30.624Z",
            "updated_at": "2017-04-02T07:04:30.624Z",
          },
          {
            "id": 2,
            "title": "Step2",
            "content": "testing",
            "active": true,
            "tutorial_id": 1,
            "css_selector": ".lobby-div",
            "order": 2,
            "created_at": "2017-04-08T05:23:26.293Z",
            "updated_at": "2017-04-08T05:23:26.293Z",
          }
        ]
      },
      "relationships": {
        "user": {
          "data": {
            "id": "1",
            "type": "users"
          }
        },
        "site": {
          "data": {
            "id": "1",
            "type": "sites"
          }
        },
        "tutorial_items": {
          "data": [
            {
              "id": "1",
              "type": "tutorial_items"
            },
            {
              "id": "2",
              "type": "tutorial_items"
            }
          ]
        }
      }
    }
  ]
}
```