import { useState } from "react";

function FAQPage() {
  const [visible, setVisible] = useState({});

  const toggleVisibility = (index) => {
    setVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="ml-10 ">
      <h1 className="text-2xl font-bold mb-10">Frequently Asked Questions</h1>
      <ul className="list-disc blue-bullet space-y-6">
        {faqItems.map((item, index) => (
          <li key={index} className="mb-4">
            <h4
              className="text-xl font-bold mb-2 cursor-pointer"
              onClick={() => toggleVisibility(index)}
            >
              {item.question}
            </h4>
            {visible[index] && <p className="text-lg font-semibold">{item.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

const faqItems = [
  {
    question: "Who benefits from meal planning?",
    answer:
      "Everyone needs weekly menu planning especially busy moms, professionals and families to simplify life.",
  },
  {
    question: "Is your meal planning app affordable?",
    answer:
      "Absolutely Yes! You can try out our meal planning app before committing to a full subscription plan.",
  },
  {
    question: "How can our meal planner help you?",
    answer: "We want meals to be more fun for you and your loved ones.",
  },
  {
    question: "How do I save recipe for later use?",
    answer:
      "Simply tap the bookmark icon on any recipe to add it to your personal recipe box. Now you can easily access your favorites whenever you are ready to cook.",
  },
  {
    question: "How do I search for recipes?",
    answer:
      "Kindly use the search bar to find recipes by name, ingredient or even cuisine type.",
  },
  {
    question: "Can I filter recipes based on dietary restrictions?",
    answer:
      "Definitely! We have filters for common dietary needs like vegan, vegetarian, gluten-free, and more. Just select the filter that apply to you and browse the delicious options.",
  },
  {
    question: "How do I create a meal plan?",
    answer:
      'It is easy! Just tap the "Create Meal Plan" button, select the number of days you want to plan for, choose your meals (breakfast, lunch, dinner and snacks), and browse our extensive recipe library.',
  },
  {
    question: "Are there step-by-step instructions for recipes?",
    answer:
      "Most certainly! Each recipe includes clear and concise instructions, often accompanied by helpful photos and tutorial videos.",
  },
];

export default FAQPage;
