import React, { useState, useRef } from "react";
  import { useEffect } from "react";
const SPOONACULAR_API_KEY = "a0a169ed5c1f44389d51286681208bc8";

const Diet = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
const [totalNutrition, setTotalNutrition] = useState({
  calories: 0,
  protein: 0,
  fat: 0,
  carbohydrates: 0
});
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.spoonacular.com/food/ingredients/autocomplete?query=${encodeURIComponent(value)}&number=5&metaInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data.filter(item => item.id));
      setShowDropdown(true);
    } catch (err) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };


useEffect(() => {
  const totals = selectedFoods.reduce(
    (acc, food) => {
      acc.calories += food.nutrition.calories * food.quantity;
      acc.protein += food.nutrition.protein * food.quantity;
      acc.fat += food.nutrition.fat * food.quantity;
      acc.carbohydrates += food.nutrition.carbohydrates * food.quantity;
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbohydrates: 0 }
  );

  setTotalNutrition(totals);
}, [selectedFoods]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const fetchNutritionData = async (id) => {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${SPOONACULAR_API_KEY}&amount=100&unit=g`
    );
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();
    
    if (!data.nutrition) {
      console.error('No nutrition data for:', id);
      return null;
    }

    return {
      calories: data.nutrition.nutrients.find(n => n.name.toLowerCase() === 'calories')?.amount || 0,
      protein: data.nutrition.nutrients.find(n => n.name.toLowerCase() === 'protein')?.amount || 0,
      fat: data.nutrition.nutrients.find(n => n.name.toLowerCase() === 'fat')?.amount || 0,
      carbohydrates: data.nutrition.nutrients.find(n => n.name.toLowerCase().includes('carbohydrate'))?.amount || 0
    };
  } catch (err) {
    console.error('Failed to fetch nutrition:', err);
    return null;
  }
};

const handleSuggestionClick = async (item) => {
  if (!item.id) {
    // Optionally show an error or ignore the click
    return;
  }
  const nutrition = await fetchNutritionData(item.id);
  if (!nutrition) {
    alert('Failed to get nutrition data for ' + item.name);
    return;
  }
  setSelectedFoods((prev) => [
    ...prev,
    { ...item, nutrition, quantity: 1 }
  ]);
  

  setQuery("");
  setSuggestions([]);
  setShowDropdown(false);
  inputRef.current.blur();
};

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleRemoveFood = (id) => {
    setSelectedFoods((prev) => prev.filter((f) => f.id !== id));
  };



  const handleQuantityChange = (id, amount) => {
    setSelectedFoods(prev => prev.map(food => 
      food.id === id ? 
      {...food, quantity: Math.max(1, food.quantity + amount)} : 
      food
    ));
  };

  return (
    <section className="w-full min-h-[100vh] font-['Outfit',sans-serif] bg-gray-50 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Panel - Search & Ingredients */}
        <div className="space-y-6">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query && setShowDropdown(true)}
              onBlur={handleBlur}
              placeholder="Search for a food item..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 z-10 max-h-56 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                    onMouseDown={() => handleSuggestionClick(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Selected Foods</h2>
            {selectedFoods.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No food items added yet</p>
            ) : (
              <ul className="space-y-4">
                {selectedFoods.map((food) => (
                  <li key={food.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-lg">{food.name}</span>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => {

                          handleRemoveFood(food.id);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <button 
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => handleQuantityChange(food.id, -1)}
                      >
                        -
                      </button>
                      <span className="font-medium">{food.quantity}x 100g</span>
                      <button 
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => handleQuantityChange(food.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Calories</div>
                        <div>{food.nutrition.calories.toFixed(1)}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Protein</div>
                        <div>{food.nutrition.protein.toFixed(1)}g</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Fat</div>
                        <div>{food.nutrition.fat.toFixed(1)}g</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Carbs</div>
                        <div>{food.nutrition.carbohydrates.toFixed(1)}g</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Panel - Nutrition Details */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-8">
          <h2 className="text-2xl font-bold mb-6">Nutrition Overview</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Calories</span>
                <span className="font-semibold text-blue-600">{totalNutrition.calories.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((totalNutrition.calories/2000)*100, 100)}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Protein</span>
                <span className="font-semibold text-green-600">{totalNutrition.protein.toFixed(1)}g</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalNutrition.protein/50)*100, 100)}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Fat</span>
                <span className="font-semibold text-yellow-600">{totalNutrition.fat.toFixed(1)}g</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalNutrition.fat/70)*100, 100)}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Carbohydrates</span>
                <span className="font-semibold text-purple-600">{totalNutrition.carbohydrates.toFixed(1)}g</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalNutrition.carbohydrates/300)*100, 100)}%` }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 rounded-lg bg-blue-100 text-blue-600 font-bold shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center">
                    <span className="text-lg">Calories</span>
                    <span className="text-2xl">{totalNutrition.calories.toFixed(1)}</span>
                  </div>
                </button>
                <button className="p-4 rounded-lg bg-green-100 text-green-600 font-bold shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center">
                    <span className="text-lg">Protein</span>
                    <span className="text-2xl">{totalNutrition.protein.toFixed(1)}g</span>
                  </div>
                </button>
                <button className="p-4 rounded-lg bg-yellow-100 text-yellow-600 font-bold shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center">
                    <span className="text-lg">Fat</span>
                    <span className="text-2xl">{totalNutrition.fat.toFixed(1)}g</span>
                  </div>
                </button>
                <button className="p-4 rounded-lg bg-purple-100 text-purple-600 font-bold shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center">
                    <span className="text-lg">Carbs</span>
                    <span className="text-2xl">{totalNutrition.carbohydrates.toFixed(1)}g</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diet;