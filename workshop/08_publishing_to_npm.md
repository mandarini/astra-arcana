# Step 8: Preparing for npm Publishing

Create `apps/mcp-server/setup-publish.js`:

```javascript
import path from 'path';
import fs from 'fs';

const distDir = path.resolve(import.meta.dirname, './dist');
const distMainJsPath = path.resolve(distDir, 'main.js');
const mainJsContent = fs.readFileSync(distMainJsPath, 'utf8');
const shebang = '#!/usr/bin/env node\n';

if (!mainJsContent.startsWith(shebang)) {
  fs.writeFileSync(distMainJsPath, shebang + mainJsContent);
  console.log('Shebang added');
}

console.log('Setup completed successfully!');
```

Add this target to `apps/mcp-server/package.json`:

```json
"setup-publish": {
  "command": "node apps/mcp-server/setup-publish.js",
  "dependsOn": ["build"]
}
```

Update `apps/mcp-server/package.json` to make it publishable:

```json
{
  "private": false,
  "bin": "./main.js"
}
```

[Next step](09_release_configuration.md)
