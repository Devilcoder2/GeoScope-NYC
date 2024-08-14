# kingspark_poi  Visualization Project

## Introduction

Build a web application using ReactJS and Typescript to visualize kingspark_poi GeoJSON data. Utilized OpenLayers library for map-based visualization.

## Techstack Used

- React
- Typescript
- TailwindCSS
- Open Layers
- Git
- Github



## Features

### 1. Map Display and GeoJSON Data

- Used OpenLayers to display map.
- Utilized GeoJSON data for mapping US population density.

### 2. Add setting panel 

-I added a setting panel when click on the setting icon 
-In the setting panel added the input field for editing or updating the buffer radius
-Also added the slider only UI implementation

### 3.Added Layer panel
-In the Layer panel show the type of selected GeoJson data name.

### 4. Tooltips for Park Information

- Added tooltips displaying park related information upon hovering over map features (such as name,type,status,entryPoint,Navigable).



### 5. Added Draw select tool - circle

- User can use this circle to select the point on the map.
- Selected point in the circle is highlighted with yellow color.
- user also change the redius of the circle in the setting panel according to view comfrot.

### 6. UI/UX Enhancements

- Implemented interactive elements (buttons, checkboxes,slider ,input edite and disable feature etc.) for better user experience.



 ### 7. Show the information inside the buffer circle

- By using Turf library extract information of the points folling inside the buffer circle.
- Also show the total number of the points inside the buffer circle





## Run Locally

To run this project locally, follow these steps:

1. Clone the repository:
   ```git clone https://github.com/Devilcoder2/Mapsense-Task/tree/main```

2. Navigate into the project directory:
   ```cd <project-directory>```

3. Install dependencies:
   ```npm install```

4. Run the development server:
   ```npm run dev```

## Screenshots of the Application 


![Screenshot 2024-08-14 184424](https://github.com/user-attachments/assets/9f1ec36b-06ec-451c-abaf-25bb3bce8073)

![Screenshot 2024-08-14 184435](https://github.com/user-attachments/assets/50a16ed5-1b75-4c6c-8f93-928c6b89f5fe)
![Screenshot 2024-08-14 184445](https://github.com/user-attachments/assets/031ef75c-4cad-4b33-874d-3be4bf85cbfe)
![Screenshot 2024-08-14 184507](https://github.com/user-attachments/assets/236b5334-9850-48e3-bcc8-1be0f4e640bb)
![Screenshot 2024-08-14 184525](https://github.com/user-attachments/assets/fb9dfb94-ba4b-4b6b-8d43-f8a5f6874792)


![Screenshot 2024-08-14 184557](https://github.com/user-attachments/assets/f84d761d-bf65-4bc4-bc9b-9c1a494c3880)


