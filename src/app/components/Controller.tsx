"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ResponseData from "../types/ResponseData";
import SelectionCard from "./SelectionCards";
import Accordion from "./Accordion";
import { PiNumberSquareOneFill } from "react-icons/pi";
import { PiNumberSquareTwoLight } from "react-icons/pi";
import { PiNumberSquareThreeFill } from "react-icons/pi";
import { PiNumberSquareFourLight } from "react-icons/pi";
import { PiNumberSquareFiveFill } from "react-icons/pi";

import ChatGPT from "./ChatGPT";

const gptTempArray: string[] = new Array(5).fill("");
let userDietPrefArr: string[] = new Array(5).fill("");

export default function Controller({
  onLoadData,
}: {
  onLoadData: ResponseData;
}) {
  const mealTimeItems = onLoadData.mealTimeData;
  const restrictionItems = onLoadData.restrictionData;
  const countryFlagItems = onLoadData.countryFlagData;
  const prepTimeData = onLoadData.prepTimeData;
  const nutritionData = onLoadData.nutritionData;

  const [parent, setParent] = useState<string | null>();
  const [userDietPref, setUserDietPref] = useState<string | null>();

  function handleChildClick(
    parent: string | null,
    userDietPref: string | null
  ) {
    setParent(parent);
    setUserDietPref(userDietPref);
    if (parent === "mealTime" && userDietPref) {
      gptTempArray[0] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 0),
        userDietPref,
        ...gptTempArray.slice(1),
      ];
    }
    if (parent === "restriction" && userDietPref) {
      gptTempArray[1] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 1),
        userDietPref,
        ...gptTempArray.slice(2),
      ];
    }
    if (parent === "country" && userDietPref) {
      gptTempArray[2] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 2),
        userDietPref,
        ...gptTempArray.slice(3),
      ];
    }
    if (parent === "prepTime" && userDietPref) {
      gptTempArray[3] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 3),
        userDietPref,
        ...gptTempArray.slice(4),
      ];
    }
    if (parent === "nutrition" && userDietPref) {
      gptTempArray[4] = userDietPref;
      userDietPrefArr = [
        ...gptTempArray.slice(0, 4),
        userDietPref,
        ...gptTempArray.slice(5),
      ];
    }
  }

  return (
    <>
      <hr />

      <div className="flex flex-col items-center justify-center">
        <h6 className="mt-10 lg:mt-20 text-xs lg:text-[1.1rem] text-md font-extralight">
          The World&apos;s Recipes... Made Yours.
        </h6>
        <h1 className="text-sm lg:text-2xl text-center mt-3">
          An App to discover world recipes based on your Dietry Prefrences.
        </h1>

        <div className="flex flex-col justify-start items-start">
          <h3 className="text-lg lg:text-xl font-md mt-10 mb-5">
            Instructions:
          </h3>
          <div className="flex flex-row justify-center items-start">
            <PiNumberSquareOneFill size={20} />
            <p className="text-xs lg:text-lg mb-2 ms-3">
              Click on the Dietry Prefrences : MEAL TIME, COUNTRY, ...
            </p>
          </div>

          <div className="flex flex-row justify-center items-start">
            <PiNumberSquareTwoLight size={20} />
            <p className="text-xs lg:text-lg mb-2 ms-3">
              Select <b>ALL</b> your Dietry Prefrences.
            </p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <PiNumberSquareThreeFill size={20} />
            <p className="text-xs lg:text-lg mb-2 ms-3">
              Then click on the GET RECIPE IDEAS button.
            </p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <PiNumberSquareFourLight size={20} />
            <p className="text-xs lg:text-lg mb-2 ms-3">
              Once you decide on a recipe you like... Input the recipe <b>#</b>{" "}
              you want to make/save.
            </p>
          </div>
          <div className="flex flex-row justify-center items-start">
            <PiNumberSquareFiveFill size={20} />
            <p className="text-xs lg:text-lg mb-10 ms-3">
              Finally, to save recipes, you must be a Member... to retrieve your
              recipes go to the Members page and click GET MY RECIPES.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <Accordion title="Meal Time">
        <SelectionCard items={mealTimeItems} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      <Accordion title="Country">
        <SelectionCard
          items={countryFlagItems}
          onChildClick={handleChildClick}
        />
      </Accordion>
      <hr />
      <Accordion title="Dietary Restrictions">
        <SelectionCard
          items={restrictionItems}
          onChildClick={handleChildClick}
        />
      </Accordion>
      <hr />
      <Accordion title="Preparation Time">
        <SelectionCard items={prepTimeData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      <Accordion title="Healthiness">
        <SelectionCard items={nutritionData} onChildClick={handleChildClick} />
      </Accordion>
      <hr />
      {/* If  all prefrences are not selected show: Please input your preferences*/}
      {
      userDietPrefArr[0] === "" ||
      userDietPrefArr[1] === "" ||
      userDietPrefArr[2] === "" ||
      userDietPrefArr[3] === "" ||
      userDietPrefArr[4] === "" ? (
        <p className="mt-7 text-left p-4 text-lg md:text-2xl font-light">
          * Please input your preferences...
        </p>
      ) : (
        // Show the GET RECIPE IDEAS button
        <>
          <ChatGPT userDietPrefArr={userDietPrefArr} />
        </>
      )}
    </>
  );
}
