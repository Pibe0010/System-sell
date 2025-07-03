import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
export const Clock = () => {
  const [hour, setHour] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const addClock = () => {
      const currentDate = new Date();
      const currentTime = currentDate.getHours();
      const minutesCurrent = currentDate.getMinutes();
      const secondsCurrent = currentDate.getSeconds();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const currentYear = currentDate.getFullYear();

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "November",
        "December",
      ];

      const mes = months[currentMonth];
      const hr = currentTime > 12 ? currentTime - 12 : currentTime;
      const am = currentTime < 12 ? "AM" : "PM";

      const formattedHora = currentTime < 10 ? "0" + currentTime : currentTime;
      const formattedMinutos =
        minutesCurrent < 10 ? "0" + minutesCurrent : minutesCurrent;
      const formattedSegundos =
        secondsCurrent < 10 ? "0" + secondsCurrent : secondsCurrent;

      setHour(`${hr}:${formattedMinutos}:${formattedSegundos}:${am}`);
      setDate(
        `${
          days[currentDate.getDay()]
        } ${currentDay} ${mes} of the ${currentYear}`
      );
    };

    const intervalId = setInterval(addClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <div className="cont-reloj">
        <div className="reloj" id="reloj">
          {<Icon icon="icon-park:alarm-clock" />} {hour}
        </div>
        <div className="datos">
          <span id="fec_Datos">{date}</span>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .cont-reloj {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
  }
  .reloj {
    font-size: 1em;
    align-items: center;
    display: flex;
    gap: 5px;
  }
  .datos {
    font-size: 1em;
  }
`;
