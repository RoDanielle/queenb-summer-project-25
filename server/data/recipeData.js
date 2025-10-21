const recipes = [
  {
  "title": "Cheesecake with lemon zest",
  "description": "A creamy cheesecake with a light topping of sweetened cream and lemon zest.",
  "image": "/uploads/Cheesecake with lemon zest.jpg",
  "sections": [
    {
      "name": "Filling",
      "ingredients": [
        { "name": "White cheese (Gina)", "quantity": "750 g" },
        { "name": "Eggs", "quantity": "5-6" },
        { "name": "Lemon zest", "quantity": "1 tsp" },
        { "name": "Vanilla extract", "quantity": "1 tsp" },
        { "name": "Sugar", "quantity": "200 g" },
        { "name": "Cornstarch", "quantity": "3 tbsp" }
      ],
      "instructions": [
        "In a bowl, mix the cheese, egg yolks, a pinch of salt, and sugar.",
        "Combine the mixtures and bake at 160°C in a water bath for one hour.",
        "Leave in the closed oven for an additional 15 minutes."
      ]
    },
    {
      "name": "Topping",
      "ingredients": [
        { "name": "White cheese", "quantity": "200 g" },
        { "name": "Whipping cream", "quantity": "125 ml" },
        { "name": "Lemon zest", "quantity": "1 tsp" },
        { "name": "Powdered sugar", "quantity": "1 tbsp" }
      ],
      "instructions": [
        "Whip the cream with powdered sugar.",
        "Add the cheese and lemon zest and mix until smooth."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Cheesecake", "Sweet", "Creamy"]
},
{
  "title": "Pizza Dough",
  "description": "A simple and classic pizza dough recipe.",
  "image": "/uploads/Pizza Dough.jpg",
  "sections": [
    {
      "name": "Dough",
      "ingredients": [
        { "name": "Flour (Shtibel 2)", "quantity": "700 g" },
        { "name": "Yeast", "quantity": "15 " },
        { "name": "Cold water", "quantity": "400 ml " },
        { "name": "Salt", "quantity": "15 g" }
      ],
      "instructions": [
        "In a mixer with a dough hook on speed 1, mix all ingredients except the salt.",
        "After 1 minute of kneading, add the salt.",
        "After 2 more minutes of kneading, increase the speed to 2 and knead for 5 minutes.",
        "Let the dough rise for about half an hour.",
        "Bake at 200°C for 10-12 minutes."
      ]
    }
  ],
  "category": "Other",
  "tags": ["Pizza", "Dough", "Yeast"]
},
{
  "title": "Brownies",
  "description": "Rich, fudgy brownies made with dark chocolate chunks.",
  "image": "/uploads/Fudgy-Chocolate-Brownies.jpg",
  "sections": [
    {
      "name": "Brownie Batter",
      "ingredients": [
        { "name": "Self-rising flour", "quantity": "240 g" },
        { "name": "Sugar", "quantity": "220 g" },
        { "name": "Cocoa powder", "quantity": "20 g" },
        { "name": "Eggs", "quantity": "4" },
        { "name": "Dark chocolate", "quantity": "200 g" },
        { "name": "Butter", "quantity": "150 g" }
      ],
      "instructions": [
        "Mix the flour, sugar, cocoa powder, and eggs together in a bowl.",
        "Melt 150 g of the dark chocolate together with all the butter.",
        "Combine the mixtures and add 50 g of chopped dark chocolate.",
        "Bake for about 10 minutes at 190°C.",
        "Lower the temperature to 180°C and continue baking for about 30 more minutes."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Brownies", "Chocolate", "Baking"]
},
{
  "title": "Grandma Irit’s Chocolate Cake",
  "description": "A rich and moist chocolate cake made with dark chocolate, butter, and a smooth chocolate glaze — a classic family recipe.",
  "image": "/uploads/Grandma Irit’s Chocolate Cake.jpg",
  "sections": [
    {
      "name": "Cake Batter",
      "ingredients": [
        { "name": "Dark chocolate", "quantity": "200 g" },
        { "name": "Eggs", "quantity": "5" },
        { "name": "Flour", "quantity": "1 cup" },
        { "name": "Sugar", "quantity": "1 cup" },
        { "name": "Wine or liqueur", "quantity": "1 tsp" },
        { "name": "Milk", "quantity": "1/2 cup" },
        { "name": "Butter", "quantity": "200 g" },
        { "name": "Cocoa powder", "quantity": "1 tbsp" }
      ],
      "instructions": [
        "Melt the butter and 200 g of dark chocolate together.",
        "Add the wine (or liqueur), milk, egg yolks, flour, and cocoa powder and mix well.",
        "In a separate bowl, beat the egg whites with a pinch of salt and the sugar until stiff peaks form.",
        "Fold the chocolate mixture into the whipped egg whites gently.",
        "Bake for 40–45 minutes at 180°C."
      ]
    },
    {
      "name": "Chocolate Glaze",
      "ingredients": [
        { "name": "Cooking cream", "quantity": "100 ml" },
        { "name": "Dark chocolate", "quantity": "100 g" }
      ],
      "instructions": [
        "Melt 100 g of dark chocolate with the cooking cream.",
        "Spread the glaze evenly over the cooled cake."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Chocolate", "Cake", "Homemade", "Grandma Recipe"]
},
{
  "title": "Butter Cookies",
  "description": "Classic buttery cookies with a crisp edge and soft center — simple and delicious.",
  "image": "/uploads/Butter Cookies.jpg",
  "sections": [
    {
      "name": "Cookie Dough",
      "ingredients": [
        { "name": "Butter", "quantity": "150 g" },
        { "name": "Sugar", "quantity": "1 1/2 cups" },
        { "name": "Eggs", "quantity": "2" },
        { "name": "Vanilla extract", "quantity": "1 tsp" },
        { "name": "Self-rising flour", "quantity": "2 1/2 cups" }
      ],
      "instructions": [
        "In a mixer with a dough hook, combine 1 cup of sugar, butter, eggs, vanilla extract, flour, and a pinch of salt.",
        "Roll out the dough to about 0.5 cm thickness.",
        "Cut out cookies with a cookie cutter.",
        "Sprinkle sugar on top.",
        "Bake at 180°C until golden brown."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Cookies", "Butter", "Baking", "Sweet"]
},
{
  "title": "Chocolate Mousse",
  "description": "A rich and airy chocolate mousse.",
  "image": "/uploads/Chocolate Mousse.jpg",
  "sections": [
    {
      "name": "Chocolate Mousse",
      "ingredients": [
        { "name": "Dark chocolate", "quantity": "250 g" },
        { "name": "Butter", "quantity": "50 g" },
        { "name": "Egg whites", "quantity": "5" },
        { "name": "Sugar", "quantity": "50 g" },
        { "name": "Whipping cream", "quantity": "500 ml" }
      ],
      "instructions": [
        "Melt the dark chocolate with the butter until smooth.",
        "Whip the egg whites with a pinch of salt and the sugar until stiff peaks form.",
        "Fold the chocolate mixture gently into the whipped egg whites.",
        "Whip the cream until soft peaks form, then fold it into the chocolate mixture.",
        "Refrigerate until the mousse sets."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Chocolate", "Mousse", "Creamy", "Dessert"]
},
{
  "title": "Savory Tart Dough",
  "description": "A flaky and buttery shortcrust dough perfect for quiches and savory pies.",
  "image": "/uploads/Savory Tart Dough.jpg",
  "sections": [
    {
      "name": "Dough",
      "ingredients": [
        { "name": "Flour", "quantity": "200 g" },
        { "name": "Salt", "quantity": "1/4 tsp" },
        { "name": "Butter", "quantity": "100 g" },
        { "name": "Sour cream", "quantity": "100 g" }
      ],
      "instructions": [
        "In a food processor, combine the flour, salt, and butter.",
        "Add the sour cream and process until a uniform dough forms.",
        "Chill in the refrigerator for 30 minutes before baking."
      ]
    }
  ],
  "category": "Other",
  "tags": ["Tart", "Pie", "Savory", "Shortcrust"]
},
{
  "title": "Chocolate Chip Cookies",
  "description": "Crispy on the outside, soft on the inside — classic chocolate chip cookies.",
  "image": "/uploads/Chocolate Chip Cookies.jpg",
  "sections": [
    {
      "name": "Cookie Dough",
      "ingredients": [
        { "name": "Self-rising flour", "quantity": "400 g" },
        { "name": "Baking soda", "quantity": "1/2 tsp" },
        { "name": "Salt", "quantity": "1/4 tsp" },
        { "name": "Dark Brown sugar", "quantity": "130 g" },
        { "name": "White sugar", "quantity": "140 g" },
        { "name": "Butter", "quantity": "150 g" },
        { "name": "Eggs", "quantity": "2" },
        { "name": "Vanilla extract", "quantity": "1 tsp" },
        { "name": "Dark chocolate", "quantity": "200 g" }
      ],
      "instructions": [
        "Mix the flour, salt, and baking soda together in a bowl.",
        "In a separate bowl, melt the butter. Add the sugars, vanilla extract, one whole egg, and one extra yolk, and mix well.",
        "Combine the wet and dry mixtures until a dough forms.",
        "Chop the dark chocolate and fold it into the dough.",
        "Chill the dough in the refrigerator for 15–30 minutes.",
        "Shape into balls and bake for about 10 minutes at 180°C, until golden."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Cookies", "Chocolate", "Baking", "Sweet"]
},
{
  "title": "Maple Cake",
  "description": "A soft and fragrant maple-flavored cake with banana and walnuts — sweet, moist, and full of aroma.",
  "image": "/uploads/Maple Cake.jpg",
  "sections": [
    {
      "name": "Cake Batter",
      "ingredients": [
        { "name": "Sugar", "quantity": "1 cup" },
        { "name": "Oil", "quantity": "1 cup" },
        { "name": "Self-rising flour", "quantity": "3 cups" },
        { "name": "Vanilla sugar", "quantity": "30 g" },
        { "name": "Eggs", "quantity": "6" },
        { "name": "Vanilla extract", "quantity": "1 tsp" },
        { "name": "Maple syrup", "quantity": "1/4 cup" },
        { "name": "Walnuts", "quantity": "50 g" },
        { "name": "Ripe banana", "quantity": "1" },
        { "name": "Cinnamon", "quantity": "1 tsp" }
      ],
      "instructions": [
        "Mix all ingredients together except the maple syrup.",
        "Pour the batter into a baking pan and bake at 180°C until golden brown.",
        "When the cake is ready, mix the maple syrup with a little water and pour over the cake while still warm."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Cake", "Maple", "Walnuts", "Baking", "Sweet"]
},
{
  "title": "Grandma Irit’s Onion Quiche",
  "description": "A rich and savory onion quiche with a buttery crust and a creamy, cheesy filling — a comforting family favorite.",
  "image": "/uploads/Onion Quiche.jpg",
  "sections": [
    {
      "name": "Crust",
      "ingredients": [
        { "name": "Self-rising flour", "quantity": "1.25 cups" },
        { "name": "Salt", "quantity": "a pinch" },
        { "name": "White cheese", "quantity": "2 tbsp" },
        { "name": "Melted butter", "quantity": "100 g" }
      ],
      "instructions": [
        "Mix the flour, melted butter, salt, and cheese together until a dough forms.",
        "Press the dough evenly into a baking dish to form the crust."
      ]
    },
    {
      "name": "Filling",
      "ingredients": [
        { "name": "White onions", "quantity": "5 large" },
        { "name": "Oil", "quantity": "2 tbsp" },
        { "name": "Butter", "quantity": "30 g" },
        { "name": "Sour cream (1%)", "quantity": "1 container" },
        { "name": "Eggs", "quantity": "2" },
        { "name": "Chicken soup powder", "quantity": "1 tbsp" },
        { "name": "Grated Parmesan cheese", "quantity": "200 g" },
        { "name": "Salt", "quantity": "1/2 tbsp" },
        { "name": "Black pepper", "quantity": "1/2 tbsp" },
        { "name": "Nutmeg", "quantity": "1/2 tsp" },
        { "name": "Oregano", "quantity": "1 tsp" }
      ],
      "instructions": [
        "Slice the onions into thin strips.",
        "Sauté the onions in oil and butter until they become translucent.",
        "Remove from heat and mix in the remaining ingredients.",
        "Pour the filling over the crust.",
        "Bake at 200°C for about 1 hour, until golden and set."
      ]
    }
  ],
  "category": "Dinner",
  "tags": ["Quiche", "Onion", "Cheese", "Grandma Recipe", "Savory Pie"]
},
{
  "title": "Grandma Hela’s Honey Cake",
  "description": "A rich and aromatic honey cake with coffee, cocoa, and apricot jam — soft, moist, and full of nostalgic flavor.",
  "image": "/uploads/Honey-Cake.jpg",
  "sections": [
    {
      "name": "Honey Cake Batter",
      "ingredients": [
        { "name": "Eggs", "quantity": "4" },
        { "name": "Oil", "quantity": "1 cup" },
        { "name": "Honey", "quantity": "1 cup" },
        { "name": "Instant coffee", "quantity": "1 tsp" },
        { "name": "Sugar", "quantity": "1 cup" },
        { "name": "Apricot jam", "quantity": "1 tbsp" },
        { "name": "Cocoa powder", "quantity": "1 tbsp" },
        { "name": "Baking soda", "quantity": "1 tsp" },
        { "name": "Self-rising flour", "quantity": "2.5 cups" },
        { "name": "Cinnamon", "quantity": "1/2 tsp" }
      ],
      "instructions": [
        "Whip the egg whites with the sugar until fluffy.",
        "In a separate bowl, mix the egg yolks, oil, honey, and apricot jam.",
        "Dissolve the coffee in 1 cup of water and add it to the mixture.",
        "Add the cocoa powder, baking soda, flour, and cinnamon, then mix well.",
        "Gently fold the whipped egg whites into the batter until combined.",
        "Divide the batter into 4 loaf tins.",
        "Bake at 180°C for about 35 minutes, until golden and a toothpick comes out clean."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Cake", "Honey", "Coffee", "Grandma Recipe", "Holiday"]
},
{
  "title": "Chocolate Pie",
  "description": "A rich and indulgent chocolate pie with a buttery shortcrust base and a smooth, airy chocolate filling.",
  "image": "/uploads/Chocolate Pie.jpg",
  "sections": [
    {
      "name": "Crust",
      "ingredients": [
        { "name": "Cold butter", "quantity": "120 g" },
        { "name": "All-purpose flour", "quantity": "180 g" },
        { "name": "Vanilla extract", "quantity": "1 tsp" },
        { "name": "Salt", "quantity": "a pinch" },
        { "name": "Egg yolk", "quantity": "1" },
        { "name": "Milk", "quantity": "2 tbsp" }
      ],
      "instructions": [
        "Cut the cold butter into cubes.",
        "In a food processor, add the butter cubes, flour, vanilla, and salt.",
        "Pulse until the mixture becomes crumbly.",
        "Add the egg yolk and milk, then process until a dough forms.",
        "Chill the dough in the refrigerator for 30 minutes.",
        "Roll out the dough and place it into a 24 cm pie pan.",
        "Prick the base with a fork and chill for 15 minutes.",
        "Bake with pie weights at 170°C for 12–15 minutes.",
        "Remove the weights and bake for another 10 minutes until lightly golden."
      ]
    },
    {
      "name": "Filling",
      "ingredients": [
        { "name": "Dark chocolate", "quantity": "280 g" },
        { "name": "Butter", "quantity": "175 g" },
        { "name": "Eggs", "quantity": "3" },
        { "name": "Sugar", "quantity": "40 g" },
        { "name": "Brandy or rum", "quantity": "1 tbsp" },
        { "name": "Salt", "quantity": "a pinch" }
      ],
      "instructions": [
        "Melt the dark chocolate and butter together until smooth.",
        "In a separate bowl, beat 2 whole eggs and 1 egg yolk with the sugar, salt, and brandy (or rum) for about 5 minutes on high speed until light and airy.",
        "Fold the chocolate mixture into the egg mixture gently until combined.",
        "Pour the filling into the pre-baked crust.",
        "Bake at 170°C for 13–17 minutes, until just set.",
        "Cool and refrigerate for at least 2 hours before serving."
      ]
    }
  ],
  "category": "Dessert",
  "tags": ["Pie", "Chocolate", "Baking", "Rich", "Sweet"]
}


];

module.exports = recipes;
