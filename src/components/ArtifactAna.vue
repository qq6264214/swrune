<template>
    <div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="alert"
            :show-file-list="false"
            :file-list="fileList"
            :multiple="false"
            :auto-upload="false"
            :on-change="loadJsonFromFile"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip">上传通过代理获得的json文件</div>
            <el-button size="small" @click="submit" style="margin-left: 10px;">下载解析</el-button>
          </el-upload>
          <el-button @click="downloadConstants">下载介绍文件</el-button>
    </div>
</template>
<script>
import json2csv from "json2csv";
import {parseSingleArtifact } from '@/utils/compute'
import { ARTIFACT } from '@/utils/constant'

export default {
    name: 'Artifact',
    data(){
        return{
            fileList:[],
            fields:['type','level','attribute','unitStyle','naturalRank','rank','priType','priValue','secEffect1Type','secEffect1value','secEffect2Type','secEffect2value','secEffect3Type','secEffect3value','secEffect4Type','secEffect4value',]
        }
    },
    methods:{
        submit(){
            
            if(this.fileList.length<1){
                return
            }
            let file = this.fileList[0]
            let reader = new FileReader()
            reader.readAsText(file.raw)    
            reader.onload = (e) => {
                
                // 读取文件内容       
                debugger
                const dataJson = JSON.parse(e.target.result)
                const artifactJson= dataJson['artifacts']
                return
                let artfacts = []
                for(let i of artifactJson){
                    
                    let singleArtifact = parseSingleArtifact(i) 
                    artfacts.push(singleArtifact)
                }
                              
                const csv = json2csv.parse(artfacts, {
                    fields: this.fields,
                    // excelStrings: true
                })
                
                if (this.myBrowserIsIE()) {
                    var BOM = "\uFEFF";
                    // 文件转Blob格式
                    var csvData = new Blob([BOM + csv], { type: "text/csv" });
                    navigator.msSaveBlob(csvData, `神器.csv`);
                }else{
                    let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + csv;
                    // 非ie 浏览器
                    this.createDownLoadClick(csvContent, `神器.csv`);
                }     
            }
            
               
        },
        //判断是否IE浏览器
        myBrowserIsIE() {
            let isIE = false;
            if (
                navigator.userAgent.indexOf("compatible") > -1 &&
                navigator.userAgent.indexOf("MSIE") > -1
            ) {
                // ie浏览器
                isIE = true;
            }
            if (navigator.userAgent.indexOf("Trident") > -1) {
                // edge 浏览器
                isIE = true;
            }
            return isIE;
        },
        //创建a标签下载
        createDownLoadClick(content, fileName) {
            const link = document.createElement("a");
            link.href = encodeURI(content);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        loadJsonFromFile(file, fileList) {
        this.fileList = fileList
        },
        downloadConstants(){
            
            var data = JSON.stringify(ARTIFACT)
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download =  "原始json对应值.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
                
        }
    // submit() {     
    //   let file = this.fileList[0]
    //   let reader = new FileReader()
    //   reader.readAsText(file.raw)    
    //   reader.onload = (e) => {
    //     // 读取文件内容       
    //     const dataJson = JSON.parse(e.target.result)
    //     const artifactJson= dataJson['Artifacts']
        
    //   }
    // },
    }
}
</script>
<style>

</style>