import React from "react";
import { func, bool, string, number } from "prop-types";

const ResultContainer = Component =>
  class extends React.Component {
    static propTypes = {
      hasResult: bool.isRequired, // Game has a result
      loading: bool, // Is result beeing
      loadingMessage: string, // Message to display while loading
      playerEmail: string, // Email of player if game already has been saved
      playerName: string, // Name of player if game already has been saved
      saveGameData: func.isRequired, // Function to save game data
      score: number,
      modalIsClosed: func,
      modalResultIsOpen: bool // Game score
    };

    static defaultProps = {
      loadingMessage: "Calculando pontuação...",
      modalResultIsOpen: false
    };

    constructor(props) {
      super(props);

      this.state = {
        email: "",
        formErrors: { email: "", name: "" },
        isFormValid: false,
        name: ""
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.saveGameDataHandler = this.saveGameDataHandler.bind(this);
    }

    handleInputChange(event) {
      event.preventDefault();

      const { formErrors } = this.state;

      const name = event.target.name;
      const value = event.target.value;

      const validator = this.validateField(name, value);

      if (!validator.valid) {
        formErrors[name] = validator.message;
      } else {
        formErrors[name] = "";
      }

      this.setState({
        formErrors,
        [name]: value
      });
    }

    saveGameDataHandler(event) {
      const { email, name } = this.state;
      const { saveGameData } = this.props;

      event.preventDefault();

      if (this.validateForm()) {
        const data = {
          email,
          name
        };

        saveGameData(data);
      }
    }

    validateField(fieldName, value) {
      const validator = {
        valid: true,
        message: ""
      };

      switch (fieldName) {
        case "email":
          const emailFilter = /^.+@.+\..{2,}$/;
          const illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;

          const isEmailValid =
            emailFilter.test(value) || value.match(illegalChars);

          validator.valid = isEmailValid;
          validator.message = isEmailValid ? "" : " E-mail inválido";
          break;
        case "name":
          const isNameValid = value.length > 0;

          validator.valid = isNameValid;
          validator.message = isNameValid ? "" : " Obrigatório";
          break;
        default:
          break;
      }

      return validator;
    }

    validateForm() {
      const { formErrors } = this.state;

      Object.keys(formErrors).forEach(fieldName => {
        const value = formErrors[fieldName];

        const validator = this.validateField(fieldName, this.state[fieldName]);

        if (!validator.valid) {
          formErrors[fieldName] = validator.message;
        } else {
          formErrors[fieldName] = "";
        }
      });

      const errorsCount = Object.values(formErrors).filter(
        error => error.length > 1
      ).length;
      let isFormValid = true;

      if (errorsCount > 0) {
        isFormValid = false;
      }

      this.setState({
        formErrors
      });

      return isFormValid;
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          handleInputChange={this.handleInputChange}
          saveGameData={this.saveGameDataHandler}
        />
      );
    }
  };

export default ResultContainer;
