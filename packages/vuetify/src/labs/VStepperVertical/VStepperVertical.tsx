// Components
import { VStepperVerticalItem } from './VStepperVerticalItem'
import { makeVExpansionPanelsProps, VExpansionPanels } from '@/components/VExpansionPanel/VExpansionPanels'
import { makeStepperProps } from '@/components/VStepper/VStepper'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, toRefs } from 'vue'
import { genericComponent, getPropertyFromItem, omit, propsFactory, useRender } from '@/util'

// Types
import type { StepperVerticalItemActionSlot } from './VStepperVerticalItem'
import type { VStepperSlot } from '@/components/VStepper/VStepper'
import type { StepperItemSlot } from '@/components/VStepper/VStepperItem'
import type { GenericProps } from '@/util'

export type VStepperVerticalSlots<T> = {
  actions: StepperVerticalItemActionSlot<T>
  default: VStepperSlot & { step: T }
  icon: StepperItemSlot<T>
  title: StepperItemSlot<T>
  subtitle: StepperItemSlot<T>
  prev: StepperVerticalItemActionSlot<T>
  next: StepperVerticalItemActionSlot<T>
} & {
  [key: `header-item.${string}`]: StepperItemSlot<T>
  [key: `item.${string}`]: StepperItemSlot<T>
}

export const makeVStepperVerticalProps = propsFactory({
  prevText: {
    type: String,
    default: '$vuetify.stepper.prev',
  },
  nextText: {
    type: String,
    default: '$vuetify.stepper.next',
  },

  ...makeStepperProps(),
  ...omit(makeVExpansionPanelsProps({
    mandatory: 'force' as const,
    variant: 'accordion' as const,
  }), ['static']),
}, 'VStepperVertical')

export const VStepperVertical = genericComponent<new <T = number>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VStepperVerticalSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VStepperVertical',

  props: makeVStepperVerticalProps(),

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const vExpansionPanelsRef = ref<typeof VExpansionPanels>()
    const { color, eager, editable, prevText, nextText, hideActions } = toRefs(props)

    const model = useProxiedModel(props, 'modelValue')
    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item)
      const value = getPropertyFromItem(item, props.itemValue, index + 1)

      return {
        title,
        value,
        raw: item,
      }
    }))

    provideDefaults({
      VStepperVerticalItem: {
        color,
        eager,
        editable,
        hideActions,
        static: true,
      },
      VStepperVerticalActions: {
        color,
        nextText,
        prevText,
      },
    })

    useRender(() => {
      const expansionPanelProps = VExpansionPanels.filterProps(props)

      return (
        <VExpansionPanels
          { ...expansionPanelProps }
          v-model={ model.value }
          ref={ vExpansionPanelsRef }
          class={[
            'v-stepper',
            {
              'v-stepper--alt-labels': props.altLabels,
              'v-stepper--flat': props.flat,
              'v-stepper--non-linear': props.nonLinear,
              'v-stepper--mobile': props.mobile,
            },
            props.class,
          ]}
          style={ props.style }
        >
          {{
            ...slots,
            default: ({ prev, next }) => {
              return (
                <>
                  { items.value.map(({ raw, ...item }) => (
                    <VStepperVerticalItem { ...item }>
                      {{
                        ...slots,
                        default: slots[`item.${item.value}`],
                      }}
                    </VStepperVerticalItem>
                  ))}

                  { slots.default?.({ prev, next, step: model.value }) }
                </>
              )
            },
          }}
        </VExpansionPanels>
      )
    })

    return {}
  },
})

export type VStepperVertical = InstanceType<typeof VStepperVertical>
