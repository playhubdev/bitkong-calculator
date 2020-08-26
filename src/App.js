import React from "react";
import "./styles.css";
import Decimal from "decimal.js";
import {
  randomNumberGenerator,
  calculateOutcomes,
  base64ToArray
} from "./utils";
import { GAME_CONFIG } from "./gameConfig";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      serverSeed: "",
      clientSeed: "",
      nonce: 0,
      bonusOption:
        "W1tbMCxbIjAuMiIsIjIiXV1dLFtbMCxbIjAuMiIsIjIiXV0sWzAsWyIwLjEiLCI1Il1dXSxbWzAsWyIwLjIiLCIyIl1dLFswLFsiMC4xIiwiNSJdXSxbMCxbIjAuMDY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NyIsIjEwIl1dXSxbWzAsWyIwLjIiLCIyIl1dLFswLFsiMC4xIiwiNSJdXSxbMCxbIjAuMDY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NyIsIjEwIl1dLFswLFsiMC4wNSIsIjIwIl1dXSxbWzAsWyIwLjIiLCIyIl1dLFswLFsiMC4xIiwiNSJdXSxbMCxbIjAuMDY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NyIsIjEwIl1dLFswLFsiMC4wNSIsIjIwIl1dLFswLFsiMC4wNCIsIjUwIl1dXSxbWzAsWyIwLjIiLCIyIl1dLFswLFsiMC4xIiwiNSJdXSxbMCxbIjAuMDY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NyIsIjEwIl1dLFswLFsiMC4wNSIsIjIwIl1dLFswLFsiMC4wNCIsIjUwIl1dLFswLFsiMC4wMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzIiwiMTAwIl1dXSxbWzAsWyIwLjIiLCIyIl1dLFswLFsiMC4xIiwiNSJdXSxbMCxbIjAuMDY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NyIsIjEwIl1dLFswLFsiMC4wNSIsIjIwIl1dLFswLFsiMC4wNCIsIjUwIl1dLFswLFsiMC4wMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzIiwiMTAwIl1dLFswLFsiMC4wMjg1NzE0Mjg1NzE0Mjg1NzE0Mjg1NzE0Mjg2IiwiMjAwIl1dXSxbWzAsWyIwLjIiLCIyIl1dLFswLFsiMC4xIiwiNSJdXSxbMCxbIjAuMDY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NyIsIjEwIl1dLFswLFsiMC4wNSIsIjIwIl1dLFswLFsiMC4wNCIsIjUwIl1dLFswLFsiMC4wMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzIiwiMTAwIl1dLFswLFsiMC4wMjg1NzE0Mjg1NzE0Mjg1NzE0Mjg1NzE0Mjg2IiwiMjAwIl1dLFswLFsiMC4wMjUiLCI1MDAiXV1dLFtbMCxbIjAuMiIsIjIiXV0sWzAsWyIwLjEiLCI1Il1dLFswLFsiMC4wNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3IiwiMTAiXV0sWzAsWyIwLjA1IiwiMjAiXV0sWzAsWyIwLjA0IiwiNTAiXV0sWzAsWyIwLjAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMiLCIxMDAiXV0sWzAsWyIwLjAyODU3MTQyODU3MTQyODU3MTQyODU3MTQyODYiLCIyMDAiXV0sWzAsWyIwLjAyNSIsIjUwMCJdXSxbMCxbIjAuMDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMiIsIjEwMDAiXV1dXQ==",
      difficulty: "0"
    };
    this.bonusConfigArray = base64ToArray(this.state.bonusOption);
  }

  render() {
    return (
      <div className="app">
        <div className="controls">
          <input
            onChange={this.setParameter("serverSeed")}
            type="text"
            value={this.state.serverSeed}
            placeholder="Server seed"
          />
          <input
            onChange={this.setParameter("clientSeed")}
            type="text"
            value={this.state.clientSeed}
            placeholder="Client seed"
          />
          <input
            onChange={this.setParameter("nonce")}
            type="number"
            value={this.state.nonce}
          />
          <input
            onChange={this.setParameter("bonusOption")}
            type="text"
            value={this.state.bonusOption}
          />
          <select
            value={this.state.difficulty}
            onChange={this.setParameter("difficulty")}
          >
            {GAME_CONFIG.MODES.map((mode, index) => {
              return (
                <option value={index} key={`option-${index}`}>
                  {mode.value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="ticket">{this.renderTicket()}</div>
      </div>
    );
  }

  renderTicket() {
    const data = this.getTicketDetailsFromOutcomes();
    return data.map((row, rowIndex) => (
      <div key={`key-${rowIndex}`}>
        {row.map((cell, cellIndex) => (
          <div className={`cell-${cell}`} key={`key-${rowIndex}-${cellIndex}`}>
            {cell}
          </div>
        ))}
      </div>
    ));
  }

  setParameter = parameter => e => {
    if (parameter === "bonusOption") {
      this.bonusConfigArray = base64ToArray(e.target.value);
    }
    this.setState({
      [parameter]: e.target.value
    });
  };

  generator = round => {
    return randomNumberGenerator(
      this.state.serverSeed,
      this.state.clientSeed,
      this.state.nonce,
      round
    );
  };

  getCurrentModeStructure = () => {
    const difficultyConfig = GAME_CONFIG.MODES[this.state.difficulty].config;
    return new Array(difficultyConfig.rows).fill(0).map(item => {
      return [
        difficultyConfig.collumns,
        ...new Array(difficultyConfig.winingCollumns).fill(
          GAME_CONFIG.bonusRangeMultiplier
        )
      ];
    });
  };

  getTicketDetailsFromOutcomes = () => {
    const difficultyConfig = GAME_CONFIG.MODES[this.state.difficulty].config;
    const isOneCellWinning = difficultyConfig.winingCollumns === 1;
    const ticketOutcomes = this.getOutcomes();
    const outcomes = ticketOutcomes.map((rowData, rowIndex) => {
      const cellIndex = rowData[0];
      let rowStructure = [];
      let winingCellIndex = 1;
      for (let i = 0; i < difficultyConfig.collumns; i++) {
        if (isOneCellWinning && cellIndex === i) {
          const bonusOutcome = this.getCellBonus(
            rowIndex,
            rowData[winingCellIndex]
          );
          rowStructure.push(bonusOutcome ? `x${bonusOutcome}` : "win");
          winingCellIndex++;
        } else if (isOneCellWinning) {
          rowStructure.push("lose");
        } else if (!isOneCellWinning && cellIndex === i) {
          rowStructure.push("lose");
        } else if (!isOneCellWinning) {
          const bonusOutcome = this.getCellBonus(
            rowIndex,
            rowData[winingCellIndex]
          );
          rowStructure.push(bonusOutcome ? `x${bonusOutcome}` : "win");
          winingCellIndex++;
        }
      }
      return rowStructure;
    });
    return outcomes;
  };

  getCellBonus = (round, number) => {
    try {
      if (!this.bonusConfigArray[round].length || number === undefined) {
        return;
      }
      const configArray = this.bonusConfigArray[round];
      const { bonusRangeMultiplier } = GAME_CONFIG;
      let start = 0;
      for (let i = 0; i < configArray.length; i++) {
        let end =
          start +
          new Decimal(configArray[i][1][0])
            .times(bonusRangeMultiplier)
            .floor()
            .toNumber();
        if (number >= start && number < end) {
          return configArray[i][1][1];
        } else {
          start = end;
        }
      }
    } catch (e) {
      return;
    }
  };

  getOutcomes = () => {
    return calculateOutcomes(this.getCurrentModeStructure(), this.generator);
  };
}
