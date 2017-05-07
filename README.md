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
        "name": "Welcome Tutorial",
        "active": true,
        "page_url": "example.com/welcome",
        "skippable": false,
        "show_steps": true
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
            },
            {
              "id": "3",
              "type": "tutorial_items"
            }
          ]
        }
      }
    }
  ],
  "included": [
    {
      "id": "1",
      "type": "tutorial_items",
      "attributes": {
        "title": "step1",
        "content": "welcome to this site.",
        "active": true,
        "css_selector": ".welcome-banner",
        "order": 1,
        "created_at": "2017-05-07T06:05:48.890Z"
      },
      "relationships": {
        "tutorial": {
          "data": {
            "id": "1",
            "type": "tutorials"
          }
        }
      }
    },
    {
      "id": "2",
      "type": "tutorial_items",
      "attributes": {
        "title": "step2",
        "content": "click here to signup...",
        "active": true,
        "css_selector": "#signup",
        "order": 2,
        "created_at": "2017-05-07T06:05:48.892Z"
      },
      "relationships": {
        "tutorial": {
          "data": {
            "id": "1",
            "type": "tutorials"
          }
        }
      }
    },
    {
      "id": "3",
      "type": "tutorial_items",
      "attributes": {
        "title": "step3",
        "content": "give us your info!",
        "active": true,
        "css_selector": "#newsletter",
        "order": 3,
        "created_at": "2017-05-07T06:05:48.895Z"
      },
      "relationships": {
        "tutorial": {
          "data": {
            "id": "1",
            "type": "tutorials"
          }
        }
      }
    }
  ]
}
```