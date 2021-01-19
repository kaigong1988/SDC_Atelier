# Atelier API

API Layer for Front End Capstone Application capable of handling web-scale production traffic with scalability.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#List-Reviews">List Reviews</a></li>
        <li><a href="#Get-Review-Metadata">Get Review Metadata</a></li>
        <li><a href="#Add-a-Review">Add a Review</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Start Server
   ```sh
   npm start
   ```

# Reviews API

### List Reviews

Returns a list of reviews for a particular product. This list _does not_ include any reported reviews.

`GET /reviews/?`

QueryParameters

| Query      | Type    | Description                                                                         |
| ---------- | ------- | ----------------------------------------------------------------------------------- |
| page       | integer | Selects the page of results to return. Default 1.                                   |
| count      | integer | Specifies how many results per page to return. Default 5.                           |
| sort       | text    | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant" |
| product_id | integer | Specifies the product for which to retrieve reviews.                                |

Sample request
`/reviews/?page=1&cout=5&product_id=2&sort=helpfulness`

Response

`Status: 200 OK `

```json
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": 0,
      "response": "",
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [
        {
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        }
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": 0,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": []
    }
    // ...
  ]
}
```

### Get Review Metadata

Returns review metadata for a given product.

`GET /reviews/meta`

Query Parameters

| Query      | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| product_id | integer | Required ID of the product for which data should be returned |

Sample request
`/reviews/meta/?product_id=2`

Response

`Status: 200 OK `

```json
{
  "product_id": "2",
  "ratings": [
    1,
    1,
    2,
    // ...
  ],
  "recommended": 5,
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}
```

### Add a Review

Adds a review for the given product.

`POST /reviews/?`

Body Parameters

| Parameter  | Type    | Description                                             |
| ---------- | ------- | ------------------------------------------------------- |
| product_id | integer | Required ID of the product to post the review for       |
| rating     | int     | Integer (1-5) indicating the review rating              |
| summary    | text    | Summary text of the review                              |
| body       | text    | Continued or full text of the review                    |
| recommend  | bool    | Value indicating if the reviewer recommends the product |
| name       | text    | Username for question asker                             |
| email      | text    | Email address for question asker                        |

Sample request
`reviews/?product_id=1&rating=3&summary=liked&body=good&recommend=1&reviewer_name=Guest&reviewer_email=smith123@gmail.com`

Response

`Status: 201 CREATED `

### Mark Review as Helpful

Updates a review to show it was found helpful.

`PUT /reviews/:review_id/helpful`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| reveiw_id | integer | Required ID of the review to update |

Response

`Status: 204 NO CONTENT `

### Report Review

Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.

`PUT /reviews/:review_id/report`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| review_id | integer | Required ID of the review to update |

Response

`Status: 204 NO CONTENT `
