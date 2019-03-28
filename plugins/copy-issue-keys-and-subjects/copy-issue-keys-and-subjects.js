(() => {
  const main = () => {
    let pathname = window.location.pathname;
    let issuesTableSelector;
    let actionsContainersSelector;
    if (pathname === '/dashboard') {
      issuesTableSelector = '#myIssueContent>#issueList';
      actionsContainersSelector = '#my-issues-content';
    } else {
      issuesTableSelector = '#issues-table';
      actionsContainersSelector = '.result-set__controller-actions';
    }
    let actionsContainers = document.querySelectorAll(actionsContainersSelector);
    actionsContainers.forEach(actionsContainer => {
      let button = buildButton(issuesTableSelector);
      actionsContainer.insertBefore(button, actionsContainer.firstChild);
    });
    new ClipboardJS('#copy-issue-keys-and-subjects', {
      text: (trigger) => {
        let issuesTable = document.querySelector(trigger.getAttribute('issues-table-selector'));
        return buildCopyTargetText(issuesTable);
      }
    });
  };

  function buildCopyTargetText(table) {
    return [].slice.call(
      table.querySelectorAll(`.copyData`)
    ).map(element => element.innerHTML).join("\n");
  }

  function buildButton(issuesTableSelector) {
    let button = document.createElement('button');
    button.setAttribute('id', 'copy-issue-keys-and-subjects');
    button.setAttribute('class', 'icon-button icon-button--default js-prop-popup-dialog-trigger | simptip-position-top simptip-movable simptip-smooth -with-text');
    button.setAttribute('issues-table-selector', issuesTableSelector);
    button.appendChild(buildButtonImage());
    button.appendChild(buildButtonLabel());
    return button;
  }

  function buildButtonLabel() {
    let label = document.createElement('span');
    label.setAttribute('class', '_assistive-text');
    label.innerHTML = "Copy All";
    return label;
  }

  function buildButtonImage() {
    let img = document.createElement('img');
    img.setAttribute('src', '/images/svg/icon_copy.svg');
    return img;
  }

  PowerUps.isEnabled("copy-issue-keys-and-subjects", (enabled) => {
    if (enabled) {
      main();
    }
  });
})();
