import { UIBuilder } from "@roguecircuitry/htmless";

export function styles(ui: UIBuilder) {
  ui.create("style", "respakgen-styles")
    .style({
      "body": {
        backgroundColor: "#0f0f0f",
        color: "white",
        fontFamily: "'Courier New', Courier, monospace"
      },

      ".foldable": {
        backgroundColor: "#1f1f1f",
        cursor: "pointer",
        flexDirection: "column",
        position: "relative",
        transition: "max-height 1s ease-in-out",
        maxHeight: "100%"
      },
      ".foldable.folded": {
        maxHeight: "1em"
      },
      ".foldable-content": {
        overflowY: "auto",
        overflowX: "hidden",
        flexDirection: "column",

        position: "absolute",
        left: "0",
        right: "0",
        top: "1em",
        bottom: "0"
      },
      ".foldable-bar": {
        maxHeight: "1em",
        backgroundColor: "#2f2f2f"
      },
      ".foldable-title": {
        fontFamily: "courier",
        textIndent: "1em",
      },
      ".foldable-arrow": {
        width: "1em",
        height: "1em",
        transform: "translate(0%, 20%) rotate(90deg)",
        transition: "transform 0.1s linear",
        marginTop: "-0.1em",
        marginLeft: "1em"
      },
      ".folded > div > .foldable-arrow": {
        transform: "translate(25%, -10%) rotate(0deg)"
      },

      ".prompt": {
        position: "absolute",
        width: "50%",
        height: "50%",
        left: "25%",
        top: "25%",
        flexDirection: "column",
        backgroundColor: "#333333e3",
        padding: "1em",
        borderRadius: "1em",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black"
      },
      ".prompt-title": {
        textAlign: "center",
        marginBottom: "auto"
      },
      ".prompt > .prompt-opt:nth-child(2n+1)": {
        backgroundColor: "#2d2c2c"
      },
      ".prompt-opt": {
        maxHeight: "2em",
        padding: "0.1em",
        margin: "0.2em",
        textIndent: "1em",
        borderRadius: "2em"
      },
      ".prompt-opt-label": {
        alignSelf: "center"
      },
      ".prompt-opt-input, .prompt-opt-select": {
        backgroundColor: "transparent",
        color: "inherit",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        maxWidth: "60%",
        marginLeft: "auto",
        borderRadius: "2em",
        height: "2.5em"
      },
      ".prompt-buttons": {
        marginTop: "auto", //place at end of container
        maxHeight: "2em"
      },
      ".prompt-submit, .prompt-cancel": {
        backgroundColor: "#00000044",
        color: "inherit",
        maxHeight: "2em",
        borderRadius: "1em",
        marginLeft: "0.5em",
        marginRight: "0.5em"
      },
      ".prompt-submit:hover": {
        backgroundColor: "#5b795a87"
      },
      ".prompt-cancel:hover": {
        backgroundColor: "#795a5a87"
      },

      "#content": {
        flexDirection: "column"
      },
      ".panel": {
        backgroundColor: "#2d2d2d",
        borderColor: "#232222",
        borderWidth: "1px",
        borderStyle: "solid"
      },
      "#menu": {
        flex: "1",
        flexDirection: "column"
      },
      "#menu-items": {
        flexDirection: "row"
      },
      ".menu-item": {
        backgroundColor: "unset"
      },
      ".menu-item:hover": {
        backgroundColor: "#00000044"
      },
      "#panels": {
        flex: "15"
      },
      "#tree": {
        flexDirection: "column",
        flex: "1"
      },
      "#editor": {
        flex: "2"
      },
      ".title": {
        width: "100%",
        textAlign: "center",
        color: "gray",
        backgroundColor: "#282828",
        height: "1em"
      },

      ".tree-tex-item": {
        minHeight: "4em",
        maxHeight: "4em",
        borderRadius: "0.5em",
        overflow: "hidden",
        backgroundColor: "#343434",
        marginTop: "1px",
        marginBottom: "1px",
        marginLeft: "1em",
        marginRight: "1em",
        
        animationName: "slidein",
        animationDuration: "1s",
        animationIterationCount: "1",
        animationTimingFunction: "ease",

        transitionProperty: "background-color",
        transitionDuration: "1s",
        
      },
      ".tree-tex-item:hover": {
        backgroundColor: "#454545"
      },
      "@keyframes slidein": {
        from: {
          transform: "translateX(-100%)"
        },
        to: {
          transform: "translateX(0%)"
        }
      },

      ".tree-tex-item-img": {
        minWidth: "4em",
        maxWidth: "4em",
        minHeight: "100%",
        maxHeight: "100%",
        imageRendering: "crisp-edges",
        backgroundSize: "4em",
        backgroundRepeat: "no-repeat"
      },
      "@keyframes spritesheet": {
        from: {
          backgroundPositionY: "0px",
        },
        to: {
          backgroundPositionY: "var(--background-y-to, 0px)"
        }
      },
      // ".tree-tex-item-img:hover": {
      //   backgroundPositionY: "var(--background-to-y, 0px)"
      // },
      ".tree-tex-item-label": {
        alignSelf: "center",
        textIndent: "1em"
      }
    });
}
