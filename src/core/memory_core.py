from typing import Any, Dict


class MemoryCore:
    def __init__(self, config: Dict[str, Any]):
        self.config = config

    async def initialize(self) -> None:
        return None

    async def save_state(self) -> None:
        return None

    async def get_usage_stats(self) -> Dict[str, Any]:
        return {"used": 0, "capacity": 0}

    async def health_check(self) -> Dict[str, Any]:
        return {"status": "healthy"}

