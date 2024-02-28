import { defineConfig } from 'vite'
import { resolve } from "path"
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: 'index',
      fileName: "index"
    }
  }
})