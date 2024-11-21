import { BaseInput, Card, BaseDropdown, BaseButton, BaseCheckbox } from '../components/index';

const GlobalComponents = {
  install(app) {
    app.component(BaseInput.name, BaseInput);
    app.component(Card.name, Card);
    app.component(BaseDropdown.name, BaseDropdown);
    app.component(BaseButton.name, BaseButton);
    app.component(BaseCheckbox.name, BaseCheckbox);
  },
};

export default GlobalComponents;
