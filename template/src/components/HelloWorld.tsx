import { defineComponent } from 'vue'
import { Button, message } from 'ant-design-vue'

export default defineComponent({
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    const handleAlert = () => {
      message.info(`hello ${props.name || 'World'}`)
    }
    return () => {
      const { name = 'World' } = props
      return (
        <div>
          <p>Hello {name}</p>
          <div>
            <Button onClick={handleAlert}>Info Message</Button>
          </div>
        </div>
      )
    }
  },
})
