import { Form as TanstackSimpleForm } from "./tanstack-form/SimpleForm/Form"
import { Form as ReactHookFormSimpleForm } from "./react-hooks-form/SimpleForm/Form"
import { Typography, Box, Tabs, Tab } from "@mui/material"
import { Divider } from "@mui/material"
import { Form as TanstackValidationForm } from "./tanstack-form/ValidationForm/Form"
import { Form as ReactHookFormValidationForm } from "./react-hooks-form/ValidationForm/Form"
import { Form as ReactHookFormDynamicForm } from "./react-hooks-form/DynamicForm/Form"
import { Form as TanstackDynamicForm } from "./tanstack-form/DynamicForm/Form"
import { useState } from "react"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          aria-label="form variants"
        >
          <Tab label="Simple Form" />
          <Tab label="Validation Form" />
          <Tab label="Dynamic Form" />
        </Tabs>
      </Box>

      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'stretch',
        gap: 2,
        p: 2
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>React Hook Form</Typography>
          <CustomTabPanel value={activeTab} index={0}>
            <ReactHookFormSimpleForm />
          </CustomTabPanel>
          <CustomTabPanel value={activeTab} index={1}>
            <ReactHookFormValidationForm />
          </CustomTabPanel>
          <CustomTabPanel value={activeTab} index={2}>
            <ReactHookFormDynamicForm />
          </CustomTabPanel>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>Tanstack Form</Typography>
          <CustomTabPanel value={activeTab} index={0}>
            <TanstackSimpleForm />
          </CustomTabPanel>
          <CustomTabPanel value={activeTab} index={1}>
            <TanstackValidationForm />
          </CustomTabPanel>
          <CustomTabPanel value={activeTab} index={2}>
            <TanstackDynamicForm />
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  )
}

export default App
