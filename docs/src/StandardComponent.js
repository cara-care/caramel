import React from 'react';
import './assets/css/standardcomponent.css';

const StandardComponent = () => {
  return (
    <div>
      <h2>Accordion</h2>
      <div className="imageTableContainer">
        <div>
          <img style={{maxWidth: "300px", margin: "24px"}} src={require("./assets/images/Accordion.gif")} />
        </div>
        <div className="divTable">
          <div className="divTableBody">
            <div className="divTableRow divTableHeading">
              <div className="divTableCell">Property</div>
              <div className="divTableCell">Type</div>
              <div className="divTableCell">Default</div>
              <div className="divTableCell">Description</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                <pre className="codeArea">
                  {`
list: {
  image ?: ImageURISource;
  name: string;
  description: string;
  iconStyle?: ImageStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  arrowStyle?: ImageStyle;
  separatorStyle?: ViewStyle;
  rowContainerStyle?: ViewStyle;
  onOpen?: () => void;
  onClose?: () => void;
}[]
                  `}
                </pre>
              </div>
              <div className="divTableCell">Array</div>
              <div className="divTableCell">-</div>
              <div className="divTableCell">The list array to render the AccordionRow components. You can add events and
            styles per row.</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                style
          </div>
              <div className="divTableCell">ViewStyle | undefined</div>
              <div className="divTableCell">-</div>
              <div className="divTableCell">Style for the FlatList parent</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                disableAutoClose
          </div>
              <div className="divTableCell">boolean | undefined</div>
              <div className="divTableCell">false</div>
              <div className="divTableCell">Disables the rows closing themselves automatically when another row is
            opened within the same Accordion.</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
                animate
          </div>
              <div className="divTableCell">boolean | undefined</div>
              <div className="divTableCell">false</div>
              <div className="divTableCell">Animates the opening and closing events of the rows.</div>
            </div>
          </div>
        </div>
      </div>
      <h4>Example</h4>
      <pre className="codeArea">
        {
`<Accordion
  list={[
      {
        image: require('./caramel.png'),
        name: 'Accordion1',
        description: 'Lorem ipsum dolor sit amet.',
      },
      {
        image: require('./caramel.png'),
        name: 'Accordion2',
        description: 'Lorem ipsum dolor sit amet.',
      },
    ]}
  animate />`
  }
  </pre>
    </div>
  );
}

export default StandardComponent;
