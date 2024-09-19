# TOPICS

## Create Topic

You can create a topic in the `/dashboard/topics/create` route where you can define

- Title for the topic
- URL for the topic, which is going to act as an ID for the topic, and act as URL in the public pages such `/topics/{topic url}`
- Description for the topic
- You can also upload an image to act as a logo or featured image for the topic
- You can also define a parent for the topic, which is going to be another topic and is going to decide the place of that topic inside the hierarchy

The page looks like this

![New topic page](./create.png)

## Edit Topic

You can edit a topic by going to `/dashboard/topics/{topic url}/edit`

![Edit topic page](./edit.png)

In this edit page, you can also delete by clicking on the "Delete Button" which should open up a modal for confirmation

![Delete topic modal](./delete.png)

## List and Search Topics
To view the Topics list, you can go to `/dashboard/topics`.
Only Sysadmin users can view and Search topics.

![List Topics](list.png)

You can search for Topics based on their name, title and description.

![Search Topics](search.png)

Clicking on a Topics will redirect you to Edit Topic Page.