import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const chartConfig = {
  options: {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%", 
        endingShape: "rounded",
        colors: {
          backgroundBarColors: ["#000"],
          backgroundBarOpacity: 1,
        },
      },
    },
    xaxis: {
      categories: [
        "Custom",
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
      ],
      labels: {
        show: true,
      },
      lines: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["#F0C3F1"], 
    },
  },
  series: [
    {
      name: "Values",
      data: [50, 40, 30, 20, 10],
    },
  ],
};

function Dash() {
  const [ResponseData, setResponseData] = useState();
  const [showChart, setShowChart] = useState(false);
  const [customSongAmount, setCustomSongAmount] = useState(99);
  const [isCharged, setIsCharged] = useState(false);
  const [regularAmounts, setRegularAmounts] = useState([79, 59, 39, 19]);
  const [areRegularAmountsValid, setAreRegularAmountsValid] = useState(false);

  const id = localStorage.getItem("id");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `https://stg.dhunjam.in/account/admin/${id}`
        );
        const resultData = data.data.data;
        setShowChart(resultData.charge_customers === true);
        setResponseData(resultData);
        setIsCharged(resultData.point3 === "Yes");
        setCustomSongAmount(resultData.category_6);
        setRegularAmounts([
          resultData.category_7,
          resultData.category_8,
          resultData.category_9,
          resultData.category_10,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [id]);

  const updateCustomSongAmount = async () => {
    try {
      const response = await axios.put(
        `https://stg.dhunjam.in/account/admin/${id}`,
        {
          amount: {
            category_6: customSongAmount,
          },
        }
      );

      if (response.status === 200 && response.data.response === "Success") {
        setCustomSongAmount(response.data.data.amount.category_6);
        console.log("Custom song amount updated successfully");
      } else {
        console.error(
          "Error updating custom song amount:",
          response.data.ui_err_msg
        );
      }
    } catch (error) {
      console.error("Error updating custom song amount:", error.message);
    }
  };

  useEffect(() => {
    console.log(ResponseData);
  }, [ResponseData]);

  useEffect(() => {
    const isCustomAmountValid = customSongAmount >= 99;

    const areRegularAmountsValid = regularAmounts.every(
      (amount, index) => amount >= [79, 59, 39, 19][index]
    );

    setAreRegularAmountsValid(areRegularAmountsValid && isCustomAmountValid);
  }, [customSongAmount, regularAmounts, isCharged]);

  const handleCustomSongAmountChange = (e) => {
    const amount = parseInt(e.target.value) || 0;
    setCustomSongAmount(amount);
  };

  const handleRegularAmountChange = (index, value) => {
    const updatedAmounts = [...regularAmounts];
    updatedAmounts[index] = parseInt(value) || 0;
    setRegularAmounts(updatedAmounts);
  };

  const handleSaveButtonClick = () => {
    console.log("Save button clicked");
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-[#FFFFFF]">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[600px]">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          {ResponseData
            ? `${ResponseData.name}, ${ResponseData.location} On Dhun Jam`
            : ""}
        </h2>{" "}
        <div className="text-[14px]">
          <div className="flex justify-between  mt-6 p-3">
            <div className="w-[50%]">
              <p>
                Do you want your customers to be charged for requesting songs?
              </p>
            </div>
            <div className="flex gap-5 justify-center  w-[50%]">
              <div className="flex items-center">
                <input
                  type="radio"
                  placeholder=""
                  className=" selection:bg-[#6741D9]"
                  checked={ResponseData?.charge_customers === true}
                />
                <p className="cursor-pointer p-1">Yes</p>{" "}
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  placeholder=""
                  checked={ResponseData?.charge_customers !== true}
                />
                <p className="cursor-pointer p-1">No</p>{" "}
              </div>
            </div>
          </div>{" "}
          <div className="flex justify-between mt-4 p-3">
            <div className="w-[50%]">
              {" "}
              <p>Custom song request amount-</p>
            </div>
            <div className=" w-[50%]">
              <input
                value={customSongAmount}
                onChange={handleCustomSongAmountChange}
                className="p-1 ring-1 w-full ring-slate-500 rounded-2xl placeholder:text-center text-center"
                placeholder="Amount"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex justify-between mt-4 p-3">
            <div className="w-[50%]">
              {" "}
              <p>
                Regular song request amounts, <br />
                from high to low-{" "}
              </p>
            </div>
            <div className="w-[50%] flex justify-between">
              {regularAmounts.map((amount, index) => (
                <input
                  key={index}
                  value={amount}
                  onChange={(e) =>
                    handleRegularAmountChange(index, e.target.value)
                  }
                  className="p-1 ring-1 w-[20%] ring-slate-500 rounded-2xl placeholder:text-center text-center cursor-pointer"
                  disabled 
                  
                  />
              ))}
            </div>
          </div>
          {showChart && (
            <Chart
              options={chartConfig.options}
              series={chartConfig.series}
              type="bar"
              height={300}
            />
          )}
          <button
            className={`bg-[#6741D9] w-full p-2 rounded-xl ${areRegularAmountsValid ? "" : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!areRegularAmountsValid}
            onClick={handleSaveButtonClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dash;
