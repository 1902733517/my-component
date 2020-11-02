import Tabs, {TabsProps} from './tabs'
import TabPane, {TabPaneProps} from './tabPane'
import { FC } from 'react'

export type ITabsComponent = FC<TabsProps> & { 
    Item: FC<TabPaneProps>
}

const TransTabs = Tabs as ITabsComponent
TransTabs.Item = TabPane

export default TransTabs