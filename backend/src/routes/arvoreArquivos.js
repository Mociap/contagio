const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const router = express.Router();

router.get('/api/arvore-arquivos', (req, res) => {
    const projectRoot = path.resolve(__dirname, '../../..');
    
    exec('dir /s /b /a:d', { cwd: projectRoot }, (error, stdout) => {
        if (error) {
            res.status(500).send('Erro ao gerar árvore de arquivos');
            return;
        }

        const directories = stdout
            .split('\n')
            .filter(dir => !dir.includes('node_modules'))
            .map(dir => path.relative(projectRoot, dir))
            .filter(dir => dir.startsWith('frontend') || dir.startsWith('backend'));

        let tree = 'eventos-app/\n';
        
        directories.forEach(dir => {
            const parts = dir.split('\\');
            const level = parts.length - 1;
            const isLast = false;
            
            const prefix = '│   '.repeat(level);
            const connector = isLast ? '└── ' : '├── ';
            
            tree += `${prefix}${connector}${parts[parts.length - 1]}/\n`;
        });

        res.send(tree);
    });
});

module.exports = router;
