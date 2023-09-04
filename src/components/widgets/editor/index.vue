<template>
  <div>
    <div :id="`editor-instance_${editorId}`"></div>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'; 

import Header from '@editorjs/header';
// import Link from '@editorjs/link';
import List from '@editorjs/list';
// import CheckList from '@editorjs/checklist';
import ImageTool from '@editorjs/image';
// import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';

export default ({
  name: "editor",
  components:{

  },
  props:{
    text: String,
    editorId: String
  },
  data(){
    return{
      editor: null
    }
  },
  created() {
    this.InitEditor();
  },
  methods: {
    /* eslint-disable */
    InitEditor() {
      this.editor = null;
      this.editor = new EditorJS({ 
        holder: `editor-instance_${this.editorId}`,
        readOnly: true,
        tools: { 
          header: Header, 
          list: List,
          imageTool: ImageTool,
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                codepen: true,
                facebook: true,
                instagram: true,
                twitter: true,
                pinterest: true,
                miro: true,
                vimeo: true,
                qqvideo: {
                  regex: /https?:\/\/v.qq.com\/x\/page\/([^\/\?\&]*)/,
                  embedUrl: 'https://v.qq.com/txp/iframe/player.html?vid=<%= remote_id %>',
                  html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 300,
                  width: 600,
                  id: (groups) => {
                    if(!groups && !groups[0]) return "a0165qlzxbt";
                    // Will return a value with <id>.html
                    const readyId = groups[0];
                    const id = readyId.replace(".html", "");
                    return id
                  }
                }
              }
            },
          },
        },
        onReady: async () => {
          if(!this.text && this.text.length < 1) return; 
          // if is clean json format post file
          if(this.text[0] === "{") {
            // Is clean json
            await this.editor.blocks.render(JSON.parse(this.text))
          } else {
            // Is HTML format
            await this.editor.blocks.renderFromHTML(this.text);
          }
        },
      })
    }
  }
})
</script>

<style>
.image-tool__caption{
  border: none;
  font-size: 1rem;
  text-align: center;
  color: #888;
  box-shadow: none;
  padding-top: 0px;
  padding-bottom: 16px;
}
.image-tool__caption:empty{
  display: none;
}
</style>
