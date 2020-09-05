import React from 'react';
import OutlinedButton from '../button/OutlinedButton';
export class TabController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active_tab: null,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    (async () => {
      let state = this.state;
      let didStateUpdate = false;
      //Update the stored active tab
      if (prevProps.active_tab_id !== this.props.active_tab_id) {
        state.active_tab = this.getActiveTab();
      }
      //Re-render
      if (didStateUpdate) {
        await new Promise((resolve, reject) => {
          this.setState(state, () => resolve());
        });
      }
    })();
  }
  render() {
    let { tabs } = this.props;
    let active_tab = this.getActiveTab();
    let tab_content = active_tab.content;
    return (
      <div
        className="h-100 w-100 m-0"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TabControllerHeadsDesktop
          tabs={tabs}
          active_tab={active_tab}
          activateTab={this.activateTab.bind(this)}
        />
        <div
          className="w-100"
          style={{
            backgroundColor: '#363A43',
            flex: '1',
            margin: 'auto',
            overflow: 'auto',
          }}
        >
          <div className="h-100" style={{ display: 'flex' }}>
            {tab_content}
          </div>
        </div>
        <TabControllerHeadsMobile
          tabs={tabs}
          active_tab={active_tab}
          activateTab={this.activateTab.bind(this)}
        />
      </div>
    );
  }

  activateTab(tab) {
    let { onTabClicked = () => {} } = this.props;
    this.setState({ active_tab: tab });
    onTabClicked(tab);
  }

  getActiveTab() {
    let { active_tab } = this.state;
    let { tabs, active_tab_id } = this.props;
    for (let tab of tabs) {
      if (tab.id === active_tab_id) {
        return tab;
      }
    }
    return active_tab;
  }
}
export default TabController;

/**
 *
 * @param {TabControllerTabsProps} props
 */
function TabControllerHeadsDesktop(props) {
  const { tabs, active_tab, activateTab } = props;
  let tabHeaderStyle = {
    display: 'flex',
    padding: '3px',
    width: '130px',
    height: '40px',
    alignItems: 'center',
  };
  /** @type {React.CSSProperties} */
  let tabHeaderTextStyle = {
    display: 'inline-block',
    flexGrow: 1,
    textAlign: 'center',
  };
  let tab_heads = tabs.map((tab, idx) => {
    const { icon, title } = tab;
    let activeClass = tab.id === active_tab.id ? 'tab-active' : '';
    return (
      <OutlinedButton
        className={`${activeClass} no-outline subtle`}
        key={idx}
        onClick={() => activateTab(tab)}
        label={
          <div style={tabHeaderStyle}>
            {icon}
            <div className="font-md" style={tabHeaderTextStyle}>
              {title}
            </div>
          </div>
        }
      />
    );
  });
  // Display only on screens that are md in size and above
  return (
    <div style={{ backgroundColor: '#363A43' }}>
      <div className="d-none d-md-block">{tab_heads}</div>
      {/* Add some spacing for the top when tool bar shifts */}
      <div className="d-block pt-1 d-md-none" />
    </div>
  );
}

/**
 * @param {TabControllerTabsProps} props
 */
function TabControllerHeadsMobile(props) {
  const { tabs, activateTab } = props;
  let widthPercent = (1 / tabs.length) * 100;
  /** @type {React.CSSProperties} */
  const tabItemStyle = { width: `${widthPercent}%`, cursor: 'pointer' };
  let tab_heads = tabs.map((tab, idx) => {
    const { icon, title } = tab;
    return (
      <td key={idx} style={tabItemStyle} onClick={() => activateTab(tab)}>
        <div className="d-flex flex-column justify-content-center">
          <div className="text-center pt-2">{icon}</div>
          <div className="p-1" />
          <small className="text-center">{title}</small>
        </div>
      </td>
    );
  });
  // Display only on screens that are md in size and above
  return (
    <table
      className="d-md-none w-100"
      style={{
        backgroundColor: '#363A43',
        paddingTop: '30px',
        borderTop: `1px solid #AAAAAA`,
      }}
    >
      <tbody className="w-100">
        <tr>{tab_heads}</tr>
      </tbody>
    </table>
  );
}
/**
 * @typedef TabControllerTabsProps
 * @property {Tab[]} tabs
 * @property {Tab} active_tab
 * @property {function} activateTab
 */

/**
 * @typedef Tab
 * @property {string} id
 * @property {*} icon
 * @property {string} title
 * @property {any} header
 */
