const recipes = [
  {
    title: "Chocolate Layer Cake",
    description: "Rich chocolate cake with a creamy filling and ganache topping.",
     image: "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
    sections: [
      {
        name: "Cake Batter",
        ingredients: [
          { name: "Flour", quantity: "2 cups" },
          { name: "Cocoa Powder", quantity: "3/4 cup" },
          { name: "Sugar", quantity: "1.5 cups" },
          { name: "Eggs", quantity: "3" },
          { name: "Butter", quantity: "1 cup" }
        ],
        instructions: [
          "Preheat oven to 350°F (175°C).",
          "Mix flour, cocoa, and sugar.",
          "Add eggs and butter, beat until smooth.",
          "Pour batter into cake pans."
        ]
      },
      {
        name: "Filling",
        ingredients: [
          { name: "Cream Cheese", quantity: "8 oz" },
          { name: "Powdered Sugar", quantity: "1 cup" },
          { name: "Vanilla Extract", quantity: "1 tsp" }
        ],
        instructions: [
          "Beat cream cheese until smooth.",
          "Add powdered sugar and vanilla.",
          "Spread between cake layers."
        ]
      },
      {
        name: "Chocolate Ganache",
        ingredients: [
          { name: "Dark Chocolate", quantity: "8 oz" },
          { name: "Heavy Cream", quantity: "1 cup" }
        ],
        instructions: [
          "Heat cream until simmering.",
          "Pour over chocolate and stir until glossy.",
          "Spread over assembled cake."
        ]
      }
    ],
    category: "Dessert",
    tags: ["cake", "chocolate", "layered"]
  },
  {
    title: "Classic Pancakes",
    description: "Fluffy breakfast pancakes.",
    image: "https://www.thedailymeal.com/img/gallery/classic-pancakes/pancakes-shutterstock.JPG",
    sections: [
      {
        name: "Batter",
        ingredients: [
          { name: "Flour", quantity: "1.5 cups" },
          { name: "Milk", quantity: "1.25 cups" },
          { name: "Eggs", quantity: "1" },
          { name: "Baking Powder", quantity: "3.5 tsp" },
          { name: "Salt", quantity: "1 tsp" },
          { name: "Sugar", quantity: "1 tbsp" },
          { name: "Butter", quantity: "3 tbsp, melted" }
        ],
        instructions: [
          "Mix dry ingredients together.",
          "Add milk, eggs, and melted butter; mix until smooth.",
          "Heat a skillet and pour batter to form pancakes.",
          "Cook until golden on both sides."
        ]
      }
    ],
    category: "Breakfast",
    tags: ["breakfast", "quick", "easy"]
  },
  {
    title: "Spaghetti Bolognese",
    description: "Classic Italian pasta with rich meat sauce.",
    image: "https://feelgoodfoodie.net/wp-content/uploads/2023/04/Pasta-Bolognese-TIMG.jpg",
    sections: [
      {
        name: "Sauce",
        ingredients: [
          { name: "Ground Beef", quantity: "1 lb" },
          { name: "Tomato Sauce", quantity: "2 cups" },
          { name: "Onion", quantity: "1, chopped" },
          { name: "Garlic", quantity: "2 cloves, minced" },
          { name: "Olive Oil", quantity: "2 tbsp" },
          { name: "Salt & Pepper", quantity: "to taste" }
        ],
        instructions: [
          "Heat oil and sauté onions and garlic.",
          "Add ground beef and cook until browned.",
          "Add tomato sauce and simmer for 20 minutes."
        ]
      },
      {
        name: "Pasta",
        ingredients: [
          { name: "Spaghetti", quantity: "12 oz" },
          { name: "Salt", quantity: "for boiling water" }
        ],
        instructions: [
          "Boil spaghetti in salted water until al dente.",
          "Drain and serve with sauce."
        ]
      }
    ],
    category: "Main",
    tags: ["pasta", "italian", "beef"]
  }
];

module.exports = recipes;
