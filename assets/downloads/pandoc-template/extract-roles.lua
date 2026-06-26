--[[
extract-roles.lua

Each front-matter .md file wraps its content in a fenced div whose class
names the role:

  ::: abstract
  Your abstract text here...
  :::

  ::: acknowledgements
  Thank you...
  :::

This filter finds those divs, moves their content into the corresponding
metadata variable (which the LaTeX template reads via $abstract$,
$acknowledgements$, etc.), and removes the div from the body.

Supported roles: abstract, acknowledgements, summary, contributions, dedication
]]

local roles = {
  abstract         = true,
  acknowledgements = true,
  summary          = true,
  contributions    = true,
  dedication       = true,
}

function Pandoc(doc)
  local meta   = doc.meta
  local blocks = doc.blocks
  local remaining = pandoc.Blocks({})

  for _, block in ipairs(blocks) do
    if block.t == "Div" then
      local cls = block.classes[1]
      if cls and roles[cls] then
        -- Hoist content into metadata (as MetaBlocks so template can render it)
        meta[cls] = pandoc.MetaBlocks(block.content)
      else
        remaining:insert(block)
      end
    else
      remaining:insert(block)
    end
  end

  return pandoc.Pandoc(remaining, meta)
end
