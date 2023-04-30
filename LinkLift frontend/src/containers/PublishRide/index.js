import React from "react";
import { useState } from "react";
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useId,
} from "@floating-ui/react";
import { FaRegUserCircle } from "react-icons/fa";

function Popover() {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Add review
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <h2 id={headingId}>Review balloon</h2>
            <textarea placeholder="Write your review..." />
            <br />
            <button
              style={{ float: "right" }}
              onClick={() => {
                console.log("Added review.");
                setIsOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

function PublishRide() {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div className="pt-24">Publish Ride</div>
      <div className="grid place-content-center">
        <button ref={refs.setReference} {...getReferenceProps()}>
          <FaRegUserCircle
            className="rounded-full bg-gray-300 text-gray-700"
            size={44}
          />
        </button>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "max-content",
              }}
              className=" bg-red-500"
              {...getFloatingProps()}
            >
              Profile
            </div>
          </FloatingFocusManager>
        )}
        <Popover />
      </div>
    </>
  );
}

export default PublishRide;
