import React from "react"
import { Text, Box } from "rebass"
import moment from "moment"
import ImagePlaceholder from "../../../../assets/svg/image-placeholder.svg"

import NotificationTimeline from "../notification/timeline"
import ClaimTimeline from "../claim/timeline"
import SwapTimeline from "../swap/timeline"
import ReturnTimeline from "../returns/timeline"
import NoteTimeline from "../notes/timeline"

import LineItem from "../line-item"
import SimpleEvent from "./simple-event"
import FulfillmentTimelineItem from "../fulfillment/timeline"
import Timeline from "../../../../components/timeline"

const getTimelineEvent = (event, rest) => {
  const {
    order,
    onResendNotification,
    onSaveClaim,
    onFulfillClaim,
    onFulfillSwap,
    onProcessSwapPayment,
    onReceiveReturn,
    onCancelReturn,
    onCancelClaim,
    onCancelSwap,
    onUpdateNotes,
    toaster,
  } = rest

  switch (event.type) {
    case "notification":
      return (
        <NotificationTimeline
          key={event.id}
          event={event}
          onResend={onResendNotification}
        />
      )
    case "note":
      return (
        <NoteTimeline
          key={event.id}
          event={event}
          toaster={toaster}
          onUpdateNotes={onUpdateNotes}
        />
      )
    case "return":
      return (
        <ReturnTimeline
          key={event.id}
          event={event}
          order={order}
          onReceiveReturn={onReceiveReturn}
          onCancelReturn={onCancelReturn}
          toaster={toaster}
        />
      )
    case "claim":
      return (
        <ClaimTimeline
          key={event.id}
          event={event}
          order={order}
          onSaveClaim={onSaveClaim}
          onFulfillClaim={onFulfillClaim}
          onReceiveReturn={onReceiveReturn}
          onCancelClaim={onCancelClaim}
        />
      )
    case "swap":
      return (
        <SwapTimeline
          key={event.id}
          event={event}
          order={order}
          onProcessPayment={onProcessSwapPayment}
          onFulfillSwap={onFulfillSwap}
          onReceiveReturn={onReceiveReturn}
          onCancelReturn={onCancelReturn}
          onCancelSwap={onCancelSwap}
        />
      )
    case "placed":
      return <SimpleEvent event={event}></SimpleEvent>

const LineItem = ({ lineItem, currency, taxRate }) => {
  const productId = lineItem?.variant?.product_id || undefined

  return (
    <Flex pl={3} alignItems="center" py={2}>
      <Flex pr={3}>
        <Box alignSelf={"center"} minWidth={"35px"}>
          {lineItem.quantity} x
        </Box>
        <Box mx={2}>
          <Flex width="30px" height="30px">
            <Image
              src={lineItem.thumbnail || ImagePlaceholder}
              height={30}
              width={30}
              p={!lineItem.thumbnail && "8px"}
              sx={{
                objectFit: "contain",
                border: "1px solid lightgray",
              }}
            />
          </Flex>
        </Box>
        <Box>
          <LineItemLabel
            ml={2}
            mr={5}
            onClick={() => {
              if (productId) {
                navigate(`/a/products/${productId}`)
              }
            }}
          >
            {lineItem.title}
            <br /> {lineItem?.variant?.sku || "-"}
            <br />
            {(1 + taxRate / 100) * (lineItem.unit_price / 100)} {currency}
          </LineItemLabel>
        </Box>
      )
  }
}

export default ({ events, ...rest }) => {
  return (
    <Timeline>
      {events.map((event, idx) => (
        <Timeline.Item isLast={events.length - 1 === idx}>
          {getTimelineEvent(event, rest)}
        </Timeline.Item>
      ))}
    </Timeline>
  )
}
