import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/ar-dz";
moment.locale("ar-dz");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let AxiosCancel = null;
function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const direction = locale === "ar" ? "rtl" : "ltr";
  const [curentDate, setCurrentDate] = useState("");
  const [tempState, setTemp] = useState({
    number: null,
    discreption: "",
    min: null,
    max: null,
    waetherIcon: "",
  });
  function handleClick() {
    if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar-dz");
    }
    setCurrentDate(moment().format("dddd Do MMMM YYYY"));
  }
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);
  useEffect(() => {
    setCurrentDate(moment().format("dddd Do MMMM YYYY"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=903f97d09ba0a11adf3cdf9014fd8900",
        {
          cancelToken: new axios.CancelToken((c) => {
            AxiosCancel = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const temp = Math.round(response.data.main.temp - 272.15);
        setTemp({
          number: temp,
          discreption: response.data.weather[0].description,
          min: Math.round(response.data.main.temp_min - 272.15),
          max: Math.round(response.data.main.temp_max - 272.15),
          waetherIcon: response.data.weather[0].icon,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      AxiosCancel();
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Content Container */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "100vh",
              alignItems: "center",
            }}
          >
            {/* Card */}
            <div
              dir={direction}
              style={{
                width: "100%",
                backgroundColor: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Card Content */}
              <div>
                {/* City & Time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={direction}
                >
                  <Typography
                    variant="h2"
                    style={{ marginRight: "20px", fontWeight: "500" }}
                  >
                    {t("Riyadh")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {curentDate}
                  </Typography>
                </div>
                {/*== City & Time ==*/}
                <hr />
                {/* Degree and Description + Cloud icon */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* Degree and Description */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {tempState.number}
                      </Typography>
                      {/* ToDo : Temp image */}
                      <img
                        src={`https://openweathermap.org/img/wn/${tempState.waetherIcon}@2x.png`}
                        alt="Weather Icon"
                      />
                    </div>

                    {/*== TEMP ==*/}
                    {/* Description */}
                    <Typography variant="h6" style={{ fontWeight: "lighter" }}>
                      {t(tempState.discreption)}
                    </Typography>
                    {/* min and max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>
                        {t("min")} : {tempState.min}
                      </h5>
                      <h5 style={{ marginRight: "10px", marginLeft: "10px" }}>
                        {" "}
                        |{" "}
                      </h5>
                      <h5>
                        {t("max")} : {tempState.max}
                      </h5>
                    </div>
                    {/*== Description ==*/}
                  </div>
                  {/*== Degree and Description ==*/}

                  {/*== Degree and Description + Cloud icon ==*/}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
              </div>
              {/*== Card Content ==*/}
            </div>
            {/*== Card ==*/}
            {/* TRANSLATION BUTTON */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Button
                variant="text"
                style={{ color: "white", fontWeight: "300", marginTop: "10px" }}
                onClick={handleClick}
              >
                {locale === "en" ? "Arabic" : "إنجليزي"}
              </Button>
            </div>
            {/*== TRANSLATION BUTTON ==*/}
          </div>
          {/*== Content Container ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
