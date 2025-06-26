"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const TrackedToken = () => {
  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#2a0827] text-white rounded-lg shadow-xl">
      <div className="bg-[#57064f] p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Tracked Tokens</h2>
        <hr className="border-t border-gray-600 mb-4" />
        <div className="mb-4">
          <label
            htmlFor="token-select"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Select a Token:
          </label>
          <select
            id="token-select"
            //value={}
            //onChange={}
            className="block w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
          >
            <option >token name</option>
          </select>
        </div>

      </div>

      <div className="bg-[#57064f] p-4 rounded-lg flex flex-col justify-center items-center min-h-[300px]">
        <h2 className="text-xl font-bold mb-3">Supply Distribution</h2>
        <hr className="border-t border-gray-600 mb-4 w-full" />
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
               // data={}
                cx="50%"
                cy="50%"
                labelLine={false}
               
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >

                  <Cell
                   // key={}
                    //fill={COLORS}
                  />
      
              </Pie>
              <Tooltip
               
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

      </div>
    </div>
  );
};

export default TrackedToken;
