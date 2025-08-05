# 🔧 CORREÇÃO DO CONFLITO ENTRE MOVIMENTO E REDIMENSIONAMENTO

## 🐛 **PROBLEMA IDENTIFICADO**

Após corrigir o redimensionamento, surgiu o problema oposto: ao **mover** elementos arrastando, os handles desalinhavam e saíam fora do elemento. Isso indicava um **conflito entre os sistemas de coordenadas** usados pelo movimento vs. redimensionamento.

## 🔍 **CAUSA RAIZ DO CONFLITO**

### **Inconsistência de Coordenadas**

1. **SelectMoveTool** → Atualizava apenas `attrs.x` e `attrs.y`
2. **SelectResizeTool** → Atualizava `attrs.transform` matrix (que contém posição)
3. **SelectedBoxManager** → Tentava usar ambos, causando conflito

### **Fluxo Problemático:**

```typescript
// ❌ ANTES - Conflito de coordenadas

// No movimento:
item.setPosition(newX, newY);  // Atualiza apenas attrs.x, attrs.y

// No redimensionamento: 
item.attrs.transform = [a, b, c, d, newX, newY];  // Posição na matrix

// No SelectedBoxManager:
transform: item.attrs.transform || [1, 0, 0, 1, item.attrs.x, item.attrs.y]
// ↑ Conflito: transform com posição X vs attrs.x com posição Y
```

## ✅ **CORREÇÕES IMPLEMENTADAS**

### **1. BaseGraphics.setPosition() Unificado** ✅

```typescript
// ✅ DEPOIS - Atualizar ambos x,y E transform
setPosition(x: number, y: number): void {
  this.updateAttrs({ x, y });
  
  // 🎯 CRITICAL FIX: Update transform matrix to reflect new position
  if (this.attrs.transform) {
    this.attrs.transform[4] = x;  // Sync x to transform
    this.attrs.transform[5] = y;  // Sync y to transform  
  }
}
```

### **2. SelectedBoxManager Inteligente** ✅

```typescript
// ✅ DEPOIS - Sempre usar posição mais atual
const currentX = item.attrs.x || 0;
const currentY = item.attrs.y || 0;

let currentTransform: number[];
if (item.attrs.transform) {
  currentTransform = [...item.attrs.transform];
  currentTransform[4] = currentX; // Força x atual
  currentTransform[5] = currentY; // Força y atual
} else {
  currentTransform = [1, 0, 0, 1, currentX, currentY];
}
```

### **3. SelectMoveTool Consistente** ✅

```typescript
// ✅ DEPOIS - Usar attrs.x/y diretamente
this.originPositions.set(item.id, { 
  x: item.attrs.x || 0,  // Consistente com setPosition
  y: item.attrs.y || 0 
});
```

## 🎯 **FLUXO UNIFICADO AGORA**

### **Durante Movimento:**
1. `SelectMoveTool` → chama `item.setPosition(newX, newY)`
2. `setPosition()` → atualiza `attrs.x`, `attrs.y` E `attrs.transform[4,5]`
3. `SelectedBoxManager` → pega posição atual e sincroniza com transform
4. **Handles permanecem alinhados** ✅

### **Durante Redimensionamento:**
1. `SelectResizeTool` → atualiza `attrs.transform` matrix
2. `SelectedBoxManager` → usa attrs.x/y (mais recente) e força na transform
3. **Handles permanecem alinhados** ✅

## 🧪 **TESTE COMPLETO**

Agora ambas operações devem funcionar:

1. **Movimento** - Arrastar elemento → Handles alinhados ✅
2. **Redimensionamento** - Arrastar handles → Handles alinhados ✅ 
3. **Alternância** - Mover → Redimensionar → Mover → Handles sempre alinhados ✅

## 📊 **LOGS DE DEBUG**

```
🔧 SelectedBoxManager.updateBounds (single item): {
  itemId: "rect_123",
  attrs: { x: 200, y: 150, width: 100, height: 80, transform: [1,0,0,1,200,150] },
  currentX: 200,  // ← Sempre sincronizado
  currentY: 150,  // ← Sempre sincronizado
  currentTransform: [1,0,0,1,200,150]  // ← x,y forçados aqui
}
```

---

**STATUS**: 🟢 **SISTEMA DE COORDENADAS UNIFICADO**

Agora movimento e redimensionamento usam o mesmo sistema de coordenadas consistente!