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
    InitEditor() {
      this.editor = null;
      this.editor = new EditorJS({ 
        holder: `editor-instance_${this.editorId}`,
        readOnly: true,
        tools: { 
          header: Header, 
          list: List,
          imageTool: ImageTool
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
