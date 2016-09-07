import MatreshkaObject from 'matreshka/object';
import SimpleTab from './simple';
import BatchTab from './batch';
import DiffTab from './diff';
import Sandbox from './components/sandbox';
import Nav from './components/nav';

export default class Tabs extends MatreshkaObject {
    constructor() {
        super({
            simple: { title: 'Simple' },
            batch: { title: 'Batch' },
            diff: { title: 'Merge' }
        })
        .instantiate({
            simple: SimpleTab,
            batch: BatchTab,
            diff: DiffTab
        })
        .bindSandbox(<Sandbox owner={this} />)
        .bindNode('nav', <Nav owner={this} />)
        .on({
            '*@change:isActive': evt => {
                if (evt.value) {
                    for (const tab of this) {
                        tab.isActive = tab === evt.self;
                    }

                    this.activeTab = evt.self;
                }
            }
        });

        this.simple.isActive = true;
    }

    onNavItemClick(item) {
        for (const tab of this) {
            tab.isActive = item === tab;
        }
    }
}